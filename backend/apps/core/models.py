from django.db import models


class BaseModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class DocumentType(models.TextChoices):

    ORDER = "order", "Buyurtma"
    CONTRACT = "contract", "Shartnoma"
    INVOICE = "invoice", "Hisob"
    CALLBACK = "callback", "Qo'ng'iroq so'rovi"


class DocumentCounter(BaseModel):

    doc_type = models.CharField(max_length=20, choices=DocumentType.choices)
    year = models.PositiveIntegerField()
    last_number = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("doc_type", "year")

    def __str__(self) -> str:
        return f"{self.doc_type}-{self.year}: {self.last_number}"
