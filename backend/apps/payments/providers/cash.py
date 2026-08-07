from typing import Any

from django.utils import timezone

from apps.orders.models import Order
from apps.payments.models import Payment, PaymentProviderType, PaymentState
from apps.payments.providers.base import PaymentProvider


class CashProvider(PaymentProvider):
    """FAOL — naqd (yetkazishda). Kuryer to'lovni oladi, admin tasdiqlaydi."""

    code = PaymentProviderType.CASH

    def create_payment(self, order: Order) -> Payment:
        return Payment.objects.create(
            order=order,
            provider=self.code,
            amount=order.total_amount,
            state=PaymentState.PENDING,
        )

    def handle_callback(self, payload: dict[str, Any]) -> Payment:
        payment = Payment.objects.get(pk=payload["payment_id"])
        payment.state = PaymentState.PAID
        payment.performed_at = timezone.now()
        payment.save(update_fields=["state", "performed_at", "updated_at"])

        return payment

    def check_status(self, payment: Payment) -> str:
        return payment.state

    def cancel(self, payment: Payment, reason: str) -> None:
        payment.state = PaymentState.CANCELLED
        payment.cancelled_at = timezone.now()
        payment.error_message = reason
        payment.save(update_fields=["state", "cancelled_at", "error_message", "updated_at"])
