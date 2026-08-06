from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from rest_framework.request import Request
from rest_framework.response import Response

from apps.catalog.filters import ProductFilter
from apps.catalog.models import Category, Product
from apps.catalog.serializers import (
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)
from apps.catalog.services import ProductViewService


class CategoryListView(generics.ListAPIView):

    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)


class ProductListView(generics.ListAPIView):

    serializer_class = ProductListSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filterset_class = ProductFilter
    search_fields = ("name_uz", "name_ru", "name_en", "sku")
    ordering_fields = ("price_uzs", "created_at", "views_count", "name_uz")
    ordering = ("-created_at",)

    def get_queryset(self) -> QuerySet[Product]:
        return (
            Product.objects.filter(is_active=True)
            .select_related("category")
            .prefetch_related("images")
        )


class ProductDetailView(generics.RetrieveAPIView):

    serializer_class = ProductDetailSerializer
    lookup_field = "slug"
    queryset = Product.objects.filter(is_active=True).prefetch_related("images", "specs")

    def retrieve(self, request: Request, *args: object, **kwargs: object) -> Response:
        product = self.get_object()
        ProductViewService().register_view(product)
        serializer = self.get_serializer(product)

        return Response(serializer.data)
