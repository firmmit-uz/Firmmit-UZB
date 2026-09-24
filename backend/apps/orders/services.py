from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from django.utils import timezone
from weasyprint import HTML

from apps.core.models import DocumentType, SiteSetting
from apps.core.numbers import amount_to_words_uz
from apps.core.services import DocumentNumberService
from apps.orders.models import Order


class OrderDocumentService:
    """Buyurtma uchun shartnoma va to'lov hisobini PDF qilib shakllantiradi."""

    def __init__(self) -> None:
        self._numbers = DocumentNumberService()

    def generate_contract(self, order: Order) -> None:
        if not order.contract_number:
            order.contract_number = self._numbers.generate_number(DocumentType.CONTRACT)
            order.contract_date = timezone.now().date()

        pdf = self._render("documents/contract.html", order)
        order.contract_file.save(f"{order.contract_number}.pdf", ContentFile(pdf), save=False)
        order.save(
            update_fields=["contract_number", "contract_date", "contract_file", "updated_at"]
        )

    def generate_invoice(self, order: Order) -> None:
        if not order.invoice_number:
            order.invoice_number = self._numbers.generate_number(DocumentType.INVOICE)

        pdf = self._render("documents/invoice.html", order)
        order.invoice_file.save(f"{order.invoice_number}.pdf", ContentFile(pdf), save=False)
        order.save(update_fields=["invoice_number", "invoice_file", "updated_at"])

    def _render(self, template_name: str, order: Order) -> bytes:
        html = render_to_string(template_name, self._build_context(order))

        return HTML(string=html, base_url="/").write_pdf()

    def _build_context(self, order: Order) -> dict:
        return {
            "order": order,
            "seller": self._seller_settings(),
            "company": order.company,
            "items": list(order.items.all()),
            "total_words": amount_to_words_uz(order.total_amount),
            "today": timezone.now().date(),
        }

    def _seller_settings(self) -> dict[str, str]:
        return {setting.key: setting.value for setting in SiteSetting.objects.all()}
