from decimal import Decimal
from typing import Any

from django.db import transaction

from apps.catalog.models import Product
from apps.core.models import DocumentType
from apps.core.notifications import notify_telegram
from apps.core.services import DocumentNumberService
from apps.customers.models import Company, Customer, CustomerType
from apps.orders.models import (
    CallbackRequest,
    Order,
    OrderItem,
    OrderStatus,
    PaymentMethod,
)
from apps.orders.services import OrderDocumentService


class OrderIntakeService:
    """Saytdan kelgan buyurtmani qabul qiladi. Narx va qoldiq serverda qayta tekshiriladi."""

    def __init__(self) -> None:
        self._numbers = DocumentNumberService()

    @transaction.atomic
    def create_legal_order(self, data: dict[str, Any]) -> Order:
        company = self._resolve_company(data["company"])
        order = self._create_order(company, data)
        self._attach_items(order, data["items"])
        self._recalculate(order)

        documents = OrderDocumentService()
        documents.generate_contract(order)
        documents.generate_invoice(order)

        notify_telegram(f"Yangi yuridik buyurtma: {order.order_number} — {order.total_amount} so'm")

        return order

    @transaction.atomic
    def create_callback_request(self, data: dict[str, Any]) -> CallbackRequest:
        number = self._numbers.generate_number(DocumentType.CALLBACK)
        snapshot, estimated = self._build_items_snapshot(data["items"])

        callback = CallbackRequest.objects.create(
            request_number=number,
            full_name=data["full_name"],
            phone=data["phone"],
            region=data.get("region") or None,
            comment=data.get("comment") or None,
            items=snapshot,
            estimated_amount=estimated,
        )
        notify_telegram(f"Yangi qo'ng'iroq so'rovi: {number} — {data['full_name']} ({data['phone']})")

        return callback

    def _resolve_company(self, company_data: dict[str, Any]) -> Company:
        existing = Company.objects.filter(inn=company_data["inn"]).first()

        if existing is not None:
            return existing

        customer = Customer.objects.create(
            customer_type=CustomerType.LEGAL,
            full_name=company_data["director_name"],
            phone=company_data["phone"],
            email=company_data.get("email"),
        )

        return Company.objects.create(customer=customer, **company_data)

    def _create_order(self, company: Company, data: dict[str, Any]) -> Order:
        number = self._numbers.generate_number(DocumentType.ORDER)
        address = data.get("address") or {}

        return Order.objects.create(
            order_number=number,
            customer_type=CustomerType.LEGAL,
            customer=company.customer,
            company=company,
            contact_name=data["contact_name"],
            phone=data["phone"],
            region=address.get("region") or None,
            district=address.get("district") or None,
            street=address.get("street") or None,
            landmark=address.get("landmark") or None,
            payment_method=PaymentMethod.BANK_TRANSFER,
            status=OrderStatus.DOCUMENTS_SENT,
        )

    def _attach_items(self, order: Order, items: list[dict[str, Any]]) -> None:
        for item in items:
            product = Product.objects.get(slug=item["slug"])
            quantity = item["quantity"]
            price = product.price_uzs
            subtotal = price * quantity
            vat_amount = (subtotal * product.vat_rate / Decimal("100")).quantize(Decimal("0.01"))

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name_uz,
                product_sku=product.sku,
                unit=product.unit,
                price=price,
                vat_rate=product.vat_rate,
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

    def _build_items_snapshot(self, items: list[dict[str, Any]]) -> tuple[list[dict], Decimal]:
        snapshot: list[dict] = []
        estimated = Decimal("0")

        for item in items:
            product = Product.objects.get(slug=item["slug"])
            quantity = item["quantity"]
            price_with_vat = product.price_with_vat()
            estimated += price_with_vat * quantity
            snapshot.append(
                {
                    "sku": product.sku,
                    "name": product.name_uz,
                    "price_with_vat": str(price_with_vat),
                    "quantity": quantity,
                }
            )

        return snapshot, estimated
