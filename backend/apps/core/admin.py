from django.contrib import admin

from apps.core.models import DocumentCounter, SiteSetting


@admin.register(DocumentCounter)
class DocumentCounterAdmin(admin.ModelAdmin):

    list_display = ("doc_type", "year", "last_number", "updated_at")
    list_filter = ("doc_type", "year")


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):

    list_display = ("key", "value", "description")
    search_fields = ("key", "value", "description")
