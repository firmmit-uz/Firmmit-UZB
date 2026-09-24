from django.db import transaction
from django.utils import timezone

from apps.core.models import DocumentCounter, DocumentType

_PREFIXES: dict[str, str] = {
    DocumentType.ORDER: "FRM",
    DocumentType.CONTRACT: "FRM-SH",
    DocumentType.INVOICE: "FRM-HI",
    DocumentType.CALLBACK: "FRM-QS",
}

_PADDING: dict[str, int] = {
    DocumentType.ORDER: 6,
    DocumentType.CONTRACT: 4,
    DocumentType.INVOICE: 4,
    DocumentType.CALLBACK: 4,
}


class DocumentNumberService:
    """Hujjat raqamlarini uzluksiz shakllantiradi (FRM-2026-000001 kabi).

    Ikki buyurtma bir xil raqam olmasligi uchun hisoblagich tranzaksiya ichida
    `SELECT ... FOR UPDATE` bilan qulflanadi.
    """

    def generate_number(self, doc_type: str) -> str:
        year = self._current_year()
        number = self._next_sequence(doc_type, year)

        return self._format_number(doc_type, year, number)

    def _current_year(self) -> int:
        return timezone.now().year

    @transaction.atomic
    def _next_sequence(self, doc_type: str, year: int) -> int:
        counter = self._lock_counter(doc_type, year)
        counter.last_number += 1
        counter.save(update_fields=["last_number", "updated_at"])

        return counter.last_number

    def _lock_counter(self, doc_type: str, year: int) -> DocumentCounter:
        counter, _ = DocumentCounter.objects.select_for_update().get_or_create(
            doc_type=doc_type,
            year=year,
        )

        return counter

    def _format_number(self, doc_type: str, year: int, number: int) -> str:
        prefix = _PREFIXES[doc_type]
        padding = _PADDING[doc_type]

        return f"{prefix}-{year}-{number:0{padding}d}"
