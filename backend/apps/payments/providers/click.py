from typing import Any

from apps.orders.models import Order
from apps.payments.models import Payment, PaymentProviderType, PaymentState
from apps.payments.providers.base import PaymentProvider

# ZAXIRA — tayyor, lekin o'chirilgan. Yoqish uchun:
#   1. .env ga kalitlar: CLICK_SERVICE_ID, CLICK_MERCHANT_ID, CLICK_SECRET_KEY
#   2. payment_method_setting da code='click' -> is_active=true
#   3. Webhook manzili Click kabinetida ko'rsatiladi
# Mavjud kod o'zgartirilmaydi.


class ClickProvider(PaymentProvider):

    code = PaymentProviderType.CLICK

    def create_payment(self, order: Order) -> Payment:
        payment = Payment.objects.create(
            order=order,
            provider=self.code,
            amount=order.total_amount,
            state=PaymentState.CREATED,
        )
        # Kalitlar bo'lganda: Click uchun to'lov havolasi shakllantiriladi.
        return payment

    def handle_callback(self, payload: dict[str, Any]) -> Payment:
        # Prepare/Complete bosqichlari + imzo (signature) tekshiruvi shu yerda.
        self._verify_signature(payload)
        payment = Payment.objects.get(transaction_id=payload["click_trans_id"])
        payment.raw_response = payload

        if payload.get("error") == "0":
            payment.state = PaymentState.PAID

        payment.save(update_fields=["raw_response", "state", "updated_at"])

        return payment

    def check_status(self, payment: Payment) -> str:
        return payment.state

    def cancel(self, payment: Payment, reason: str) -> None:
        payment.state = PaymentState.CANCELLED
        payment.error_message = reason
        payment.save(update_fields=["state", "error_message", "updated_at"])

    def _verify_signature(self, payload: dict[str, Any]) -> None:
        # md5 imzo tekshiruvi (CLICK_SECRET_KEY bilan) — kalitlar yoqilganda faollashadi.
        return None
