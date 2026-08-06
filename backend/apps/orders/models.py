from django.conf import settings
from django.db import models

from apps.catalog.models import Product
from apps.core.models import BaseModel
from apps.customers.models import Company, Customer, CustomerType


class OrderStatus(models.TextChoices):

    NEW = "new", "Yangi"
    DOCUMENTS_SENT = "documents_sent", "Hujjatlar shakllantirildi"
    AWAITING_PAYMENT = "awaiting_payment", "To'lov kutilmoqda"
    CONFIRMED = "confirmed", "Tasdiqlandi"
    PREPARING = "preparing", "Tayyorlanmoqda"
    SHIPPED = "shipped", "Jo'natildi"
    DELIVERED = "delivered", "Yetkazildi"
    CANCELLED = "cancelled", "Bekor qilindi"
    REJECTED = "rejected", "Rad etildi"


class PaymentMethod(models.TextChoices):

    BANK_TRANSFER = "bank_transfer", "Bank o'tkazmasi"
    CASH = "cash", "Naqd"
    CLICK = "click", "Click"
    PAYME = "payme", "Payme"
    ATMOS = "atmos", "ATMOS"


class PaymentStatus(models.TextChoices):

    UNPAID = "unpaid", "To'lanmagan"
    PARTIAL = "partial", "Qisman"
    PAID = "paid", "To'langan"
    REFUNDED = "refunded", "Qaytarilgan"


class Order(BaseModel):

    order_number = models.CharField(max_length=30, unique=True)
    customer_type = models.CharField(max_length=20, choices=CustomerType.choices)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.PROTECT, null=True, blank=True)
    contact_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    region = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    street = models.CharField(max_length=300, null=True, blank=True)
    landmark = models.CharField(max_length=200, null=True, blank=True)
    amount_without_vat = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    vat_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    items_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    payment_status = models.CharField(
        max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.UNPAID
    )
    status = models.CharField(max_length=20, choices=OrderStatus.choices, default=OrderStatus.NEW)
    contract_number = models.CharField(max_length=30, null=True, blank=True)
    contract_date = models.DateField(null=True, blank=True)
    contract_file = models.FileField(upload_to="contracts/", null=True, blank=True)
    invoice_number = models.CharField(max_length=30, null=True, blank=True)
    invoice_file = models.FileField(upload_to="invoices/", null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    cancel_reason = models.TextField(null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Buyurtma"
        verbose_name_plural = "Buyurtmalar"

    def __str__(self) -> str:
        return self.order_number

    def is_legal(self) -> bool:
        return self.customer_type == CustomerType.LEGAL


class OrderItem(BaseModel):

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, null=True, blank=True)
    product_name = models.CharField(max_length=300)
    product_sku = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    vat_rate = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=14, decimal_places=2)
    vat_amount = models.DecimalField(max_digits=14, decimal_places=2)
    total = models.DecimalField(max_digits=14, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.product_name} x {self.quantity}"


class OrderStatusLog(BaseModel):

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="status_logs")
    from_status = models.CharField(max_length=20, null=True, blank=True)
    to_status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    comment = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.order.order_number}: {self.from_status} -> {self.to_status}"


class DeliveryZone(BaseModel):

    region = models.CharField(max_length=100)
    district = models.CharField(max_length=100, null=True, blank=True)
    fee = models.DecimalField(max_digits=12, decimal_places=2)
    free_from_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    estimated_days = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.region} {self.district or ''}".strip()
