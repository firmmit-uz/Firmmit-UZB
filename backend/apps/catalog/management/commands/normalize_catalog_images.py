from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from PIL import Image

from apps.catalog.models import ProductImage

CANVAS = 800  # yakuniy kvadrat o'lcham (piksel)
FIT = 700  # rasm shu o'lchamga sig'diriladi, atrofida oq hoshiya qoladi


class Command(BaseCommand):
    help = "Katalog rasmlarini bir xil kvadrat (oq fon) o'lchamga keltirib WebP ga o'giradi."

    def handle(self, *args: object, **options: object) -> None:
        count = 0

        for image in ProductImage.objects.filter(image__contains="products/catalog/"):
            new_name = self._process(image.image.name)

            if new_name is None:
                continue

            image.image = new_name
            image.save(update_fields=["image", "updated_at"])
            count += 1

        self.stdout.write(f"Bir xil o'lchamda WebP ga o'girildi: {count}")

    def _process(self, rel_path: str) -> str | None:
        source = Path(settings.MEDIA_ROOT) / rel_path

        if not source.exists():
            return None

        target_rel = rel_path.rsplit(".", 1)[0] + ".webp"
        self._build_square(source).save(
            Path(settings.MEDIA_ROOT) / target_rel,
            "WEBP",
            quality=82,
            method=6,
        )

        if source.suffix.lower() != ".webp":
            source.unlink(missing_ok=True)

        return target_rel

    def _build_square(self, source: Path) -> Image.Image:
        image = self._scale_to_fit(self._flatten(source))
        canvas = Image.new("RGB", (CANVAS, CANVAS), (255, 255, 255))
        offset = ((CANVAS - image.width) // 2, (CANVAS - image.height) // 2)
        canvas.paste(image, offset)

        return canvas

    def _scale_to_fit(self, image: Image.Image) -> Image.Image:
        scale = FIT / max(image.width, image.height)
        size = (round(image.width * scale), round(image.height * scale))

        return image.resize(size, Image.LANCZOS)

    def _flatten(self, source: Path) -> Image.Image:
        image = Image.open(source)

        if image.mode in ("RGBA", "LA", "P"):
            image = image.convert("RGBA")
            background = Image.new("RGBA", image.size, (255, 255, 255, 255))
            return Image.alpha_composite(background, image).convert("RGB")

        return image.convert("RGB")
