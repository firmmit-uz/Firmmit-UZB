from typing import Any

from apps.orders.models import Order
from apps.payments.models import Payment, PaymentProviderType, PaymentState
from apps.payments.providers.base import PaymentProvider

# ZAXIRA — tayyor, lekin o'chirilgan. Yoqish uchun:
#   1. .env ga kalitlar: PAYME_MERCHANT_ID, PAYME_KEY
#   2. payment_method_setting da code='payme' -> is_active=true
#   3. Webhook (JSON-RPC) manzili Payme kabinetida ko'rsatiladi


class PaymeProvider(PaymentProvider):

    code = PaymentProviderType.PAYME

    def create_payment(self, order: Order) -> Payment:
        return Payment.objects.create(
            order=order,
            provider=self.code,
            amount=order.total_amount,
            state=PaymentState.CREATED,
        )

    def handle_callback(self, payload: dict[str, Any]) -> Payment:
        # Payme JSON-RPC metodlari: CheckPerformTransaction, CreateTransaction,
        # PerformTransaction, CancelTransaction — Basic Auth bilan.
        method = payload.get("method")
        payment = Payment.objects.get(transaction_id=payload["params"]["id"])

        if method == "PerformTransaction":
            payment.state = PaymentState.PAID
            payment.save(update_fields=["state", "updated_at"])

        return payment

    def check_status(self, payment: Payment) -> str:
        return payment.state

    def cancel(self, payment: Payment, reason: str) -> None:
        payment.state = PaymentState.CANCELLED
        payment.error_message = reason
        payment.save(update_fields=["state", "error_message", "updated_at"])
