from django.contrib import admin

from apps.customers.models import Address, Company, Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = ("full_name", "customer_type", "phone", "email", "is_active")
    list_filter = ("customer_type", "is_active", "is_verified")
    search_fields = ("full_name", "phone", "email")


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):

    list_display = ("name", "inn", "bank_name", "mfo", "is_verified")
    search_fields = ("name", "inn", "bank_account")


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):

    list_display = ("customer", "region", "district", "is_default")
    list_filter = ("region",)
