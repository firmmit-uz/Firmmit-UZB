from abc import ABC, abstractmethod
from typing import Any

from apps.orders.models import Order
from apps.payments.models import Payment


class PaymentProvider(ABC):
    """To'lov provayderlari uchun umumiy interfeys.

    Yangi provayder (Click/Payme/ATMOS) shu to'rt metodni bajaradi. Mavjud kod
    o'zgarmaydi — faqat yangi fayl qo'shiladi va PaymentMethodSetting yoqiladi.
    """

    code: str = ""

    @abstractmethod
    def create_payment(self, order: Order) -> Payment:
        """To'lov yozuvini yaratadi, kerak bo'lsa havola qaytaradi."""

    @abstractmethod
    def handle_callback(self, payload: dict[str, Any]) -> Payment:
        """Tashqi tizimdan kelgan xabarni qayta ishlaydi."""

    @abstractmethod
    def check_status(self, payment: Payment) -> str:
        """To'lov holatini tekshiradi."""

    @abstractmethod
    def cancel(self, payment: Payment, reason: str) -> None:
        """To'lovni bekor qiladi."""
