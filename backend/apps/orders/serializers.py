from rest_framework import serializers

from apps.catalog.models import Product
from apps.customers.models import account_validator, inn_validator, mfo_validator


class ItemInputSerializer(serializers.Serializer):

    slug = serializers.SlugField()
    quantity = serializers.IntegerField(min_value=1)

    def validate_slug(self, value: str) -> str:
        if not Product.objects.filter(slug=value, is_active=True).exists():
            raise serializers.ValidationError("Mahsulot topilmadi yoki faol emas.")

        return value


class CompanyInputSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=300)
    inn = serializers.CharField(validators=[inn_validator])
    bank_account = serializers.CharField(validators=[account_validator])
    bank_name = serializers.CharField(max_length=200)
    mfo = serializers.CharField(validators=[mfo_validator])
    legal_address = serializers.CharField(max_length=400)
    director_name = serializers.CharField(max_length=200)
    director_position = serializers.CharField(max_length=100, required=False, default="Direktor")
    phone = serializers.CharField(max_length=20)
    email = serializers.EmailField()


class AddressInputSerializer(serializers.Serializer):

    region = serializers.CharField(required=False, allow_blank=True)
    district = serializers.CharField(required=False, allow_blank=True)
    street = serializers.CharField(required=False, allow_blank=True)
    landmark = serializers.CharField(required=False, allow_blank=True)


class LegalCheckoutSerializer(serializers.Serializer):

    company = CompanyInputSerializer()
    contact_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=20)
    address = AddressInputSerializer(required=False)
    items = ItemInputSerializer(many=True)

    def validate_items(self, value: list) -> list:
        if not value:
            raise serializers.ValidationError("Savat bo'sh.")

        return value


class IndividualCheckoutSerializer(serializers.Serializer):

    full_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=20)
    region = serializers.CharField(required=False, allow_blank=True)
    comment = serializers.CharField(required=False, allow_blank=True)
    items = ItemInputSerializer(many=True)

    def validate_items(self, value: list) -> list:
        if not value:
            raise serializers.ValidationError("Savat bo'sh.")

        return value
