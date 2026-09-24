from django.contrib.auth.models import AbstractBaseUser
from django.db import transaction
from django.utils import timezone

from apps.orders.models import Order, OrderStatus, OrderStatusLog, PaymentStatus
from apps.payments.models import Payment, PaymentState


class PaymentService:
    """To'lovni tasdiqlash va buyurtma holatini yangilash mantiqi."""

    @transaction.atomic
    def apply_paid(self, payment: Payment, user: AbstractBaseUser | None = None) -> None:
        payment.state = PaymentState.PAID
        payment.confirmed_by = user
        payment.performed_at = payment.performed_at or timezone.now()
        payment.save(update_fields=["state", "confirmed_by", "performed_at", "updated_at"])
        self._mark_order_paid(payment.order, user)

    def _mark_order_paid(self, order: Order, user: AbstractBaseUser | None) -> None:
        previous = order.status
        order.payment_status = PaymentStatus.PAID
        order.status = OrderStatus.CONFIRMED
        order.paid_at = timezone.now()
        order.save(update_fields=["payment_status", "status", "paid_at", "updated_at"])

        OrderStatusLog.objects.create(
            order=order,
            from_status=previous,
            to_status=OrderStatus.CONFIRMED,
            changed_by=user,
            comment="To'lov tasdiqlandi",
        )
