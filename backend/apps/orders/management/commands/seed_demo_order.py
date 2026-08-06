from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.catalog.models import Product
from apps.core.models import DocumentType
from apps.core.services import DocumentNumberService
from apps.customers.models import Company, Customer, CustomerType
from apps.orders.models import Order, OrderItem, PaymentMethod
from apps.orders.services import OrderDocumentService

_DEMO_PRICES = [Decimal("250000"), Decimal("1200000"), Decimal("85000")]
_DEMO_QTY = [10, 3, 25]
_VAT = Decimal("12")


class Command(BaseCommand):
    help = "Sinov uchun yuridik shaxs buyurtmasi yaratib, shartnoma va hisob PDF shakllantiradi."

    @transaction.atomic
    def handle(self, *args: object, **options: object) -> None:
        company = self._demo_company()
        order = self._build_order(company)
        self._add_items(order)
        self._recalculate(order)

        service = OrderDocumentService()
        service.generate_contract(order)
        service.generate_invoice(order)

        self.stdout.write(f"Buyurtma: {order.order_number}")
        self.stdout.write(f"Shartnoma: {order.contract_number} -> {order.contract_file.name}")
        self.stdout.write(f"Hisob: {order.invoice_number} -> {order.invoice_file.name}")
        self.stdout.write(f"Umumiy summa: {order.total_amount}")

    def _demo_company(self) -> Company:
        customer, _ = Customer.objects.get_or_create(
            phone="+998901112233",
            defaults={"customer_type": CustomerType.LEGAL, "full_name": "Каримов Азиз"},
        )
        company, _ = Company.objects.get_or_create(
            inn="123456789",
            defaults={
                "customer": customer,
                "name": "«СИНОВ АГРО» МЧЖ",
                "bank_account": "20208000000000000001",
                "bank_name": "АТ «Ипотека-банк» Тошкент филиали",
                "mfo": "00014",
                "legal_address": "Тошкент ш., Чилонзор тумани, Бунёдкор шоҳкўчаси, 12-уй",
                "director_name": "Каримов Азиз Валиевич",
                "phone": "+998901112233",
                "email": "test@example.com",
            },
        )

        return company

    def _build_order(self, company: Company) -> Order:
        number = DocumentNumberService().generate_number(DocumentType.ORDER)

        return Order.objects.create(
            order_number=number,
            customer_type=CustomerType.LEGAL,
            customer=company.customer,
            company=company,
            contact_name=company.director_name,
            phone=company.phone,
            payment_method=PaymentMethod.BANK_TRANSFER,
        )

    def _add_items(self, order: Order) -> None:
        products = list(Product.objects.all()[:3])

        for index, product in enumerate(products):
            price = _DEMO_PRICES[index]
            quantity = _DEMO_QTY[index]
            subtotal = price * quantity
            vat_amount = (subtotal * _VAT / Decimal("100")).quantize(Decimal("0.01"))

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name_uz,
                product_sku=product.sku,
                unit=product.unit,
                price=price,
                vat_rate=_VAT,
                quantity=quantity,
                subtotal=subtotal,
                vat_amount=vat_amount,
                total=subtotal + vat_amount,
            )

    def _recalculate(self, order: Order) -> None:
        items = order.items.all()
        order.amount_without_vat = sum((item.subtotal for item in items), Decimal("0"))
        order.vat_amount = sum((item.vat_amount for item in items), Decimal("0"))
        order.items_amount = sum((item.total for item in items), Decimal("0"))
        order.total_amount = order.items_amount + order.delivery_fee
        order.save()
