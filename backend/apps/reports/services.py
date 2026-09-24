from datetime import timedelta
from decimal import Decimal
from typing import Any

from django.db.models import Count, Sum
from django.utils import timezone

from apps.catalog.models import Product
from apps.orders.models import CallbackRequest, CallbackStatus, Order, OrderStatus
from apps.payments.models import Payment, PaymentState

LOW_STOCK_THRESHOLD = 10


class ReportService:
    """Boshqaruv paneli hisobotlari. Raqamlar to'g'ridan-to'g'ri bazadan olinadi."""

    def summary(self) -> dict[str, Any]:
        return {
            "revenue_total": str(self._paid_sum()),
            "revenue_last_30_days": str(self._paid_sum(days=30)),
            "payment_methods": self._payment_method_breakdown(),
            "customer_types": self._customer_type_ratio(),
            "unpaid_invoices": self._unpaid_invoices(),
            "rejected_cancelled": self._rejected_cancelled(),
            "missed_callbacks": self._missed_callbacks(),
            "low_stock": self._low_stock(),
        }

    def _paid_sum(self, days: int | None = None) -> Decimal:
        payments = Payment.objects.filter(state=PaymentState.PAID)

        if days is not None:
            payments = payments.filter(performed_at__gte=timezone.now() - timedelta(days=days))

        return payments.aggregate(total=Sum("amount"))["total"] or Decimal("0")

    def _payment_method_breakdown(self) -> list[dict]:
        rows = (
            Payment.objects.filter(state=PaymentState.PAID)
            .values("provider")
            .annotate(total=Sum("amount"), count=Count("id"))
        )

        return [{"provider": r["provider"], "total": str(r["total"]), "count": r["count"]} for r in rows]

    def _customer_type_ratio(self) -> list[dict]:
        rows = Order.objects.values("customer_type").annotate(count=Count("id"))

        return [{"customer_type": r["customer_type"], "count": r["count"]} for r in rows]

    def _unpaid_invoices(self) -> list[dict]:
        orders = Order.objects.filter(
            status__in=[OrderStatus.DOCUMENTS_SENT, OrderStatus.AWAITING_PAYMENT]
        )
        now = timezone.now()

        return [
            {
                "order_number": order.order_number,
                "total": str(order.total_amount),
                "days_pending": (now - order.created_at).days,
            }
            for order in orders
        ]

    def _rejected_cancelled(self) -> list[dict]:
        orders = Order.objects.filter(
            status__in=[OrderStatus.REJECTED, OrderStatus.CANCELLED]
        )

        return [
            {"order_number": o.order_number, "status": o.status, "reason": o.cancel_reason}
            for o in orders
        ]

    def _missed_callbacks(self) -> int:
        return CallbackRequest.objects.filter(status=CallbackStatus.NEW).count()

    def _low_stock(self) -> list[dict]:
        rows = Product.objects.filter(
            stock_quantity__lt=LOW_STOCK_THRESHOLD, is_active=True
        ).values("sku", "name_uz", "stock_quantity")

        return list(rows)
