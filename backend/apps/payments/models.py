from django.conf import settings
from django.db import models

from apps.core.models import BaseModel
from apps.orders.models import Order


class AvailableFor(models.TextChoices):

    LEGAL = "legal", "Yuridik shaxs"
    INDIVIDUAL = "individual", "Jismoniy shaxs"
    BOTH = "both", "Ikkalasi"


class PaymentMethodSetting(BaseModel):

    code = models.CharField(max_length=20, primary_key=True)
    name_uz = models.CharField(max_length=100)
    name_ru = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    available_for = models.CharField(
        max_length=20, choices=AvailableFor.choices, default=AvailableFor.BOTH
    )
    sort_order = models.PositiveIntegerField(default=0)
    config = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ("sort_order",)
        verbose_name = "To'lov usuli"
        verbose_name_plural = "To'lov usullari"

    def __str__(self) -> str:
        return f"{self.code} ({'faol' if self.is_active else 'ochirilgan'})"


class PaymentProviderType(models.TextChoices):

    BANK_TRANSFER = "bank_transfer", "Bank o'tkazmasi"
    CASH = "cash", "Naqd"
    CLICK = "click", "Click"
    PAYME = "payme", "Payme"
    ATMOS = "atmos", "ATMOS"


class PaymentState(models.TextChoices):

    CREATED = "created", "Yaratildi"
    PENDING = "pending", "Kutilmoqda"
    PAID = "paid", "To'landi"
    CANCELLED = "cancelled", "Bekor qilindi"
    REFUNDED = "refunded", "Qaytarildi"


class Payment(BaseModel):

    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="payments")
    provider = models.CharField(max_length=20, choices=PaymentProviderType.choices)
    transaction_id = models.CharField(max_length=100, null=True, blank=True)
    bank_document_number = models.CharField(max_length=50, null=True, blank=True)
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    state = models.CharField(max_length=20, choices=PaymentState.choices, default=PaymentState.CREATED)
    confirmed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    error_code = models.CharField(max_length=50, null=True, blank=True)
    error_message = models.TextField(null=True, blank=True)
    performed_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    raw_response = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "To'lov"
        verbose_name_plural = "To'lovlar"

    def __str__(self) -> str:
        return f"{self.order.order_number} — {self.amount} ({self.state})"

    def is_paid(self) -> bool:
        return self.state == PaymentState.PAID
