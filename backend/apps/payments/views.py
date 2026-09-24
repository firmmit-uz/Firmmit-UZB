from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.payments.models import PaymentMethodSetting
from apps.payments.serializers import PaymentMethodSerializer


class PaymentMethodListView(generics.ListAPIView):

    serializer_class = PaymentMethodSerializer
    queryset = PaymentMethodSetting.objects.filter(is_active=True)


class DisabledWebhookView(APIView):
    """Webhook manzili band qilinadi. Usul o'chirilgan bo'lsa 503 qaytaradi."""

    authentication_classes: list = []
    provider_code = ""

    def post(self, request: Request, *args: object, **kwargs: object) -> Response:
        setting = PaymentMethodSetting.objects.filter(code=self.provider_code).first()

        if setting is None or not setting.is_active:
            return Response(
                {"detail": "To'lov usuli o'chirilgan.", "code": "provider_disabled"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response({"detail": "OK", "code": "ok"})


class ClickWebhookView(DisabledWebhookView):

    provider_code = "click"


class PaymeWebhookView(DisabledWebhookView):

    provider_code = "payme"


class AtmosWebhookView(DisabledWebhookView):

    provider_code = "atmos"
