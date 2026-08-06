from rest_framework import serializers

from apps.catalog.models import Category, Product, ProductImage, ProductSpec


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            "id",
            "parent",
            "name_uz",
            "name_ru",
            "name_en",
            "slug",
            "image",
            "sort_order",
        )


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ("image", "alt_text", "is_main", "sort_order")


class ProductSpecSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductSpec
        fields = (
            "name_uz",
            "name_ru",
            "name_en",
            "value_uz",
            "value_ru",
            "value_en",
            "sort_order",
        )


class ProductListSerializer(serializers.ModelSerializer):

    price_with_vat = serializers.SerializerMethodField()
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "sku",
            "name_uz",
            "name_ru",
            "name_en",
            "slug",
            "short_description_uz",
            "short_description_ru",
            "short_description_en",
            "price_uzs",
            "vat_rate",
            "price_with_vat",
            "old_price_uzs",
            "unit",
            "stock_quantity",
            "is_featured",
            "main_image",
        )

    def get_price_with_vat(self, obj: Product) -> str:
        return str(obj.price_with_vat())

    def get_main_image(self, obj: Product) -> str | None:
        image = obj.images.filter(is_main=True).first() or obj.images.first()

        if image is None:
            return None

        return self._absolute_url(image.image.url)

    def _absolute_url(self, url: str) -> str:
        request = self.context.get("request")

        if request is None:
            return url

        return request.build_absolute_uri(url)


class ProductDetailSerializer(ProductListSerializer):

    images = ProductImageSerializer(many=True, read_only=True)
    specs = ProductSpecSerializer(many=True, read_only=True)

    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + (
            "description_uz",
            "description_ru",
            "description_en",
            "price_usd",
            "min_order_quantity",
            "weight_kg",
            "images",
            "specs",
        )
