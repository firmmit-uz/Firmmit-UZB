import django_filters
from django.db.models import QuerySet

from apps.catalog.models import Product


class ProductFilter(django_filters.FilterSet):

    category = django_filters.CharFilter(field_name="category__slug")
    price_min = django_filters.NumberFilter(field_name="price_uzs", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price_uzs", lookup_expr="lte")
    in_stock = django_filters.BooleanFilter(method="filter_in_stock")

    class Meta:
        model = Product
        fields = ("category", "price_min", "price_max", "in_stock", "is_featured")

    def filter_in_stock(
        self,
        queryset: QuerySet[Product],
        name: str,
        value: bool,
    ) -> QuerySet[Product]:
        if value is True:
            return queryset.filter(stock_quantity__gt=0)

        return queryset
