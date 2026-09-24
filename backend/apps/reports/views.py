import csv

from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.orders.models import Order
from apps.reports.services import ReportService


class DashboardReportView(APIView):
    """Boshqaruv paneli hisoboti (faqat admin)."""

    permission_classes = [IsAdminUser]

    def get(self, request: Request) -> Response:
        return Response(ReportService().summary())


class OrdersCsvView(APIView):
    """Buyurtmalarni CSV (Excel) ga chiqaradi (faqat admin)."""

    permission_classes = [IsAdminUser]

    def get(self, request: Request) -> HttpResponse:
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = 'attachment; filename="buyurtmalar.csv"'
        response.write("﻿")  # Excel kirill matnni to'g'ri ochishi uchun BOM

        writer = csv.writer(response)
        writer.writerow(["Buyurtma", "Tur", "Xaridor", "Summa", "Holat", "To'lov", "Sana"])

        for order in Order.objects.all():
            writer.writerow(
                [
                    order.order_number,
                    order.customer_type,
                    order.contact_name,
                    order.total_amount,
                    order.status,
                    order.payment_status,
                    order.created_at.strftime("%Y-%m-%d %H:%M"),
                ]
            )

        return response
