from django.core.management.base import BaseCommand

from apps.payments.models import AvailableFor, PaymentMethodSetting

# (code, uz, ru, en, is_active, available_for, sort_order)
METHODS = [
    ("bank_transfer", "Bank o'tkazmasi", "Банковский перевод", "Bank transfer",
     True, AvailableFor.LEGAL, 1),
    ("cash", "Naqd (yetkazishda)", "Наличными (при доставке)", "Cash on delivery",
     False, AvailableFor.INDIVIDUAL, 2),
    ("click", "Click", "Click", "Click", False, AvailableFor.BOTH, 3),
    ("payme", "Payme", "Payme", "Payme", False, AvailableFor.BOTH, 4),
    ("atmos", "ATMOS", "ATMOS", "ATMOS", False, AvailableFor.BOTH, 5),
]


class Command(BaseCommand):
    help = "To'lov usullarini payment_method_setting jadvaliga yuklaydi."

    def handle(self, *args: object, **options: object) -> None:
        count = 0

        for code, uz, ru, en, is_active, available_for, sort_order in METHODS:
            PaymentMethodSetting.objects.update_or_create(
                code=code,
                defaults={
                    "name_uz": uz,
                    "name_ru": ru,
                    "name_en": en,
                    "is_active": is_active,
                    "available_for": available_for,
                    "sort_order": sort_order,
                },
            )
            count += 1

        self.stdout.write(f"To'lov usullari yuklandi: {count}")
