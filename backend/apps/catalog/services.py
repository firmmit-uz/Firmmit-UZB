from django.db.models import F

from apps.catalog.models import Product


class ProductViewService:

    def register_view(self, product: Product) -> None:
        Product.objects.filter(pk=product.pk).update(views_count=F("views_count") + 1)
