from django.urls import path

from apps.reports.views import DashboardReportView, OrdersCsvView

urlpatterns = [
    path("reports/summary/", DashboardReportView.as_view(), name="report-summary"),
    path("reports/orders.csv", OrdersCsvView.as_view(), name="report-orders-csv"),
]
