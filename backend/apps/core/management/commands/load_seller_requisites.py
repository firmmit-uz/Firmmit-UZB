import json
from pathlib import Path

from django.core.management.base import BaseCommand

from apps.core.models import SiteSetting


class Command(BaseCommand):
    help = "Sotuvchi rekvizitlarini site_setting jadvaliga yuklaydi (fixture fayldan)."

    def handle(self, *args: object, **options: object) -> None:
        created, updated = self._load()

        self.stdout.write(f"Yaratildi: {created}, yangilandi: {updated}")

    def _load(self) -> tuple[int, int]:
        created = 0
        updated = 0

        for entry in self._read_fixture():
            _, is_new = SiteSetting.objects.update_or_create(
                key=entry["pk"],
                defaults={
                    "value": entry["fields"]["value"],
                    "description": entry["fields"].get("description"),
                },
            )

            if is_new:
                created += 1
            else:
                updated += 1

        return created, updated

    def _read_fixture(self) -> list[dict]:
        path = Path(__file__).resolve().parents[2] / "fixtures" / "seller_requisites.json"

        with open(path, encoding="utf-8") as file:
            return json.load(file)
