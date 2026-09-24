from rest_framework import serializers

from apps.payments.models import PaymentMethodSetting


class PaymentMethodSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentMethodSetting
        fields = ("code", "name_uz", "name_ru", "name_en", "available_for", "sort_order")
