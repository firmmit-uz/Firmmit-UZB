import json

from django.conf import settings
from django.core.management.base import BaseCommand

from apps.catalog.models import Product, ProductImage


class Command(BaseCommand):
    help = "media/catalog_images.json bo'yicha mahsulotlarga asosiy rasm biriktiradi."

    def handle(self, *args: object, **options: object) -> None:
        mapping = self._load_mapping()
        attached, skipped, missing = self._attach(mapping)

        self.stdout.write(f"Rasm biriktirildi: {attached}")
        self.stdout.write(f"Allaqachon rasmli (o'tkazildi): {skipped}")
        self.stdout.write(f"Mahsulot topilmadi: {missing}")

    def _load_mapping(self) -> dict[str, str]:
        path = settings.MEDIA_ROOT / "catalog_images.json"

        with open(path, encoding="utf-8") as file:
            return json.load(file)

    def _attach(self, mapping: dict[str, str]) -> tuple[int, int, list[str]]:
        attached = 0
        skipped = 0
        missing: list[str] = []

        for sku, image_path in mapping.items():
            product = Product.objects.filter(sku=sku).first()

            if product is None:
                missing.append(sku)
                continue

            if product.images.exists():
                skipped += 1
                continue

            ProductImage.objects.create(product=product, image=image_path, is_main=True)
            attached += 1

        return attached, skipped, missing
