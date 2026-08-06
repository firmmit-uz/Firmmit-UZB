from django.contrib import admin
from django.utils.html import format_html

from apps.orders.models import DeliveryZone, Order, OrderItem, OrderStatusLog
from apps.orders.services import OrderDocumentService


class OrderItemInline(admin.TabularInline):

    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "order_number",
        "customer_type",
        "contact_name",
        "total_amount",
        "status",
        "payment_status",
        "documents",
    )
    list_filter = ("status", "payment_status", "customer_type", "payment_method")
    search_fields = ("order_number", "contact_name", "phone", "contract_number", "invoice_number")
    inlines = (OrderItemInline,)
    actions = ("generate_documents",)

    @admin.display(description="Hujjatlar")
    def documents(self, obj: Order) -> str:
        links = []

        if obj.contract_file:
            links.append(f'<a href="{obj.contract_file.url}" target="_blank">Shartnoma</a>')

        if obj.invoice_file:
            links.append(f'<a href="{obj.invoice_file.url}" target="_blank">Hisob</a>')

        return format_html(" · ".join(links)) if links else "—"

    @admin.action(description="Shartnoma va hisob PDF shakllantirish")
    def generate_documents(self, request, queryset) -> None:
        service = OrderDocumentService()

        for order in queryset:
            service.generate_contract(order)
            service.generate_invoice(order)

        self.message_user(request, f"{queryset.count()} ta buyurtma uchun hujjatlar shakllandi.")


@admin.register(DeliveryZone)
class DeliveryZoneAdmin(admin.ModelAdmin):

    list_display = ("region", "district", "fee", "estimated_days", "is_active")
    list_filter = ("is_active", "region")


@admin.register(OrderStatusLog)
class OrderStatusLogAdmin(admin.ModelAdmin):

    list_display = ("order", "from_status", "to_status", "changed_by", "created_at")
