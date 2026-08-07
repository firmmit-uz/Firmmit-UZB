from typing import Any

from apps.orders.models import Order
from apps.payments.models import Payment, PaymentProviderType, PaymentState
from apps.payments.providers.base import PaymentProvider

# ZAXIRA — tayyor, lekin o'chirilgan. Yoqish uchun:
#   1. .env ga kalitlar: ATMOS_STORE_ID, ATMOS_CONSUMER_KEY, ATMOS_CONSUMER_SECRET
#   2. payment_method_setting da code='atmos' -> is_active=true
#   3. Webhook manzili ATMOS kabinetida ko'rsatiladi


class AtmosProvider(PaymentProvider):

    code = PaymentProviderType.ATMOS

    def create_payment(self, order: Order) -> Payment:
        return Payment.objects.create(
            order=order,
            provider=self.code,
            amount=order.total_amount,
            state=PaymentState.CREATED,
        )

    def handle_callback(self, payload: dict[str, Any]) -> Payment:
        # ATMOS: OAuth token + pre-apply/apply bosqichlari va imzo tekshiruvi.
        payment = Payment.objects.get(transaction_id=payload["transaction_id"])

        if payload.get("status") == "success":
            payment.state = PaymentState.PAID

        payment.raw_response = payload
        payment.save(update_fields=["state", "raw_response", "updated_at"])

        return payment

    def check_status(self, payment: Payment) -> str:
        return payment.state

    def cancel(self, payment: Payment, reason: str) -> None:
        payment.state = PaymentState.CANCELLED
        payment.error_message = reason
        payment.save(update_fields=["state", "error_message", "updated_at"])
