from django.urls import path

from apps.payments.views import (
    AtmosWebhookView,
    ClickWebhookView,
    PaymentMethodListView,
    PaymeWebhookView,
)

urlpatterns = [
    path("payment-methods/", PaymentMethodListView.as_view(), name="payment-methods"),
    path("payments/click/", ClickWebhookView.as_view(), name="click-webhook"),
    path("payments/payme/", PaymeWebhookView.as_view(), name="payme-webhook"),
    path("payments/atmos/", AtmosWebhookView.as_view(), name="atmos-webhook"),
]
