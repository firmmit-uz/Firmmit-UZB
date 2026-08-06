from django.contrib import admin

from apps.catalog.models import Category, Product, ProductImage, ProductSpec


class ProductImageInline(admin.TabularInline):

    model = ProductImage
    extra = 1


class ProductSpecInline(admin.TabularInline):

    model = ProductSpec
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = ("name_uz", "parent", "sort_order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name_uz", "name_ru", "name_en")
    prepopulated_fields = {"slug": ("name_uz",)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = ("name_uz", "sku", "category", "price_uzs", "stock_quantity", "is_active")
    list_filter = ("category", "is_active", "is_featured", "unit")
    search_fields = ("name_uz", "name_ru", "name_en", "sku")
    prepopulated_fields = {"slug": ("name_uz",)}
    inlines = (ProductImageInline, ProductSpecInline)
