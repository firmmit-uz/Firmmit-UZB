from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from apps.catalog.models import Product, ProductImage

PLACEHOLDER = "products/placeholder.webp"

# Material rasm -> qaysi mahsulotlar (tur bo'yicha)
MATERIAL_SKUS = {
    "mat05": ["FMT-04"],
    "mat01": ["FMT-07", "FMT-10"],
    "mat16": ["FMT-06", "FMT-09", "FMT-16"],
    "mat02": ["FMT-11", "FMT-12", "FMT-13"],
    "mat03": ["FMT-14"],
    "mat04": ["FMT-62"],
    "mat06": ["FMT-19", "FMT-38", "FMT-35"],
    "mat07": ["FMT-44", "FMT-46"],
    "mat08": ["FMT-30"],
    "mat15": ["FMT-42", "FMT-43", "FMT-36", "FMT-45", "FMT-17"],
    "mat09": ["FMT-26", "FMT-37"],
    "mat10": ["FMT-40"],
    "mat11": ["FMT-41"],
    "mat12": ["FMT-31", "FMT-33", "FMT-29", "FMT-32", "FMT-39", "FMT-27", "FMT-25"],
    "mat13": ["FMT-18", "FMT-21", "FMT-22", "FMT-23", "FMT-50"],
    "mat14": ["FMT-20"],
}


class Command(BaseCommand):
    help = "Sifatli material rasmlarini turi bo'yicha qo'yadi, qolganlariga F. placeholder."

    def handle(self, *args: object, **options: object) -> None:
        sku_to_image = self._build_sku_map()
        real = 0
        placeholder = 0

        for product in Product.objects.filter(sku__startswith="FMT-"):
            product.images.all().delete()
            image_path = sku_to_image.get(product.sku, PLACEHOLDER)
            ProductImage.objects.create(product=product, image=image_path, is_main=True)

            if image_path == PLACEHOLDER:
                placeholder += 1
            else:
                real += 1

        self._cleanup_old_catalog_files()

        self.stdout.write(f"Material rasm qo'yildi: {real}")
        self.stdout.write(f"F. placeholder qo'yildi: {placeholder}")

    def _build_sku_map(self) -> dict[str, str]:
        result: dict[str, str] = {}

        for material, skus in MATERIAL_SKUS.items():
            for sku in skus:
                result[sku] = f"products/materials/{material}.webp"

        return result

    def _cleanup_old_catalog_files(self) -> None:
        catalog_dir = Path(settings.MEDIA_ROOT) / "products" / "catalog"

        if not catalog_dir.exists():
            return

        for file in catalog_dir.glob("*.webp"):
            file.unlink()
