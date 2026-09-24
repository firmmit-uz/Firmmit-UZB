from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.orders.intake import OrderIntakeService
from apps.orders.serializers import IndividualCheckoutSerializer, LegalCheckoutSerializer


class LegalCheckoutView(APIView):
    """Yuridik shaxs buyurtmasi. Narx serverda qayta hisoblanadi, hujjatlar shakllanadi."""

    authentication_classes: list = []

    def post(self, request: Request) -> Response:
        serializer = LegalCheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = OrderIntakeService().create_legal_order(serializer.validated_data)

        return Response(
            {
                "order_number": order.order_number,
                "contract_number": order.contract_number,
                "invoice_number": order.invoice_number,
                "contract_file": self._file_url(request, order.contract_file),
                "invoice_file": self._file_url(request, order.invoice_file),
                "total_amount": str(order.total_amount),
            },
            status=status.HTTP_201_CREATED,
        )

    def _file_url(self, request: Request, file_field) -> str | None:
        if not file_field:
            return None

        return request.build_absolute_uri(file_field.url)


class IndividualCheckoutView(APIView):
    """Jismoniy shaxs — qo'ng'iroq so'rovi yaratiladi (savat bilan)."""

    authentication_classes: list = []

    def post(self, request: Request) -> Response:
        serializer = IndividualCheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        callback = OrderIntakeService().create_callback_request(serializer.validated_data)

        return Response(
            {
                "request_number": callback.request_number,
                "estimated_amount": str(callback.estimated_amount),
            },
            status=status.HTTP_201_CREATED,
        )
