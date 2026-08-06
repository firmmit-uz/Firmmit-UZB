from django.core.validators import RegexValidator
from django.db import models

from apps.core.models import BaseModel

inn_validator = RegexValidator(r"^\d{9}$", "STIR aniq 9 raqamdan iborat bo'lishi kerak.")
account_validator = RegexValidator(r"^\d{20}$", "Hisobraqam aniq 20 raqamdan iborat bo'lishi kerak.")
mfo_validator = RegexValidator(r"^\d{5}$", "MFO aniq 5 raqamdan iborat bo'lishi kerak.")


class CustomerType(models.TextChoices):

    LEGAL = "legal", "Yuridik shaxs"
    INDIVIDUAL = "individual", "Jismoniy shaxs"


class Customer(BaseModel):

    customer_type = models.CharField(max_length=20, choices=CustomerType.choices)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200, null=True, blank=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.full_name} ({self.phone})"


class Company(BaseModel):

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="companies")
    name = models.CharField(max_length=300)
    inn = models.CharField(max_length=9, db_index=True, validators=[inn_validator])
    bank_account = models.CharField(max_length=20, validators=[account_validator])
    bank_name = models.CharField(max_length=200)
    mfo = models.CharField(max_length=5, validators=[mfo_validator])
    oked = models.CharField(max_length=10, null=True, blank=True)
    legal_address = models.CharField(max_length=400)
    director_name = models.CharField(max_length=200)
    director_position = models.CharField(max_length=100, default="Direktor")
    vat_certificate = models.CharField(max_length=20, null=True, blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    is_verified = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Yuridik shaxs"
        verbose_name_plural = "Yuridik shaxslar"

    def __str__(self) -> str:
        return f"{self.name} (STIR {self.inn})"


class Address(BaseModel):

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="addresses")
    region = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    street = models.CharField(max_length=300)
    landmark = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=20)
    is_default = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.region}, {self.district}, {self.street}"
