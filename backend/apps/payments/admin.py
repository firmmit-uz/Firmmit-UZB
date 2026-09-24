from django.contrib import admin

from apps.payments.models import Payment, PaymentMethodSetting, PaymentState
from apps.payments.services import PaymentService


@admin.register(PaymentMethodSetting)
class PaymentMethodSettingAdmin(admin.ModelAdmin):

    list_display = ("code", "name_uz", "is_active", "available_for", "sort_order")
    list_editable = ("is_active", "sort_order")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "order",
        "provider",
        "amount",
        "state",
        "bank_document_number",
        "confirmed_by",
        "created_at",
    )
    list_filter = ("state", "provider")
    search_fields = ("order__order_number", "bank_document_number", "transaction_id")

    def save_model(self, request, obj, form, change) -> None:
        was_paid = change and Payment.objects.get(pk=obj.pk).state == PaymentState.PAID
        super().save_model(request, obj, form, change)

        if obj.state == PaymentState.PAID and not was_paid:
            PaymentService().apply_paid(obj, request.user)
