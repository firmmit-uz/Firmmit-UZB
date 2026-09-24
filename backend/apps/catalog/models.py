from decimal import Decimal

from django.db import models

from apps.core.models import BaseModel


class Category(BaseModel):

    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="children",
    )
    name_uz = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description_uz = models.TextField(null=True, blank=True)
    description_ru = models.TextField(null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="categories/", null=True, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("sort_order", "name_uz")
        verbose_name = "Kategoriya"
        verbose_name_plural = "Kategoriyalar"

    def __str__(self) -> str:
        return self.name_uz


class UnitType(models.TextChoices):

    PIECE = "dona", "dona"
    KILOGRAM = "kg", "kg"
    BOX = "quti", "quti"
    METER = "metr", "metr"


class Product(BaseModel):

    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    sku = models.CharField(max_length=50, unique=True)
    name_uz = models.CharField(max_length=300)
    name_ru = models.CharField(max_length=300)
    name_en = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True)
    short_description_uz = models.CharField(max_length=500, null=True, blank=True)
    short_description_ru = models.CharField(max_length=500, null=True, blank=True)
    short_description_en = models.CharField(max_length=500, null=True, blank=True)
    description_uz = models.TextField(null=True, blank=True)
    description_ru = models.TextField(null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    price_uzs = models.DecimalField(max_digits=14, decimal_places=2)
    vat_rate = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal("12.00"))
    price_usd = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    old_price_uzs = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    unit = models.CharField(max_length=20, choices=UnitType.choices, default=UnitType.PIECE)
    stock_quantity = models.PositiveIntegerField(default=0)
    min_order_quantity = models.PositiveIntegerField(default=1)
    weight_kg = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    views_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Mahsulot"
        verbose_name_plural = "Mahsulotlar"

    def __str__(self) -> str:
        return f"{self.name_uz} ({self.sku})"

    def has_stock(self) -> bool:
        return self.stock_quantity > 0

    def price_with_vat(self) -> Decimal:
        multiplier = Decimal("1") + (self.vat_rate / Decimal("100"))

        return (self.price_uzs * multiplier).quantize(Decimal("0.01"))


class ProductImage(BaseModel):

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=200, null=True, blank=True)
    is_main = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("sort_order",)

    def __str__(self) -> str:
        return f"{self.product.sku} — rasm {self.sort_order}"


class ProductSpec(BaseModel):

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="specs")
    name_uz = models.CharField(max_length=150)
    name_ru = models.CharField(max_length=150)
    name_en = models.CharField(max_length=150)
    value_uz = models.CharField(max_length=300)
    value_ru = models.CharField(max_length=300)
    value_en = models.CharField(max_length=300)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("sort_order",)

    def __str__(self) -> str:
        return f"{self.name_uz}: {self.value_uz}"
