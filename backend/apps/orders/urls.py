from django.urls import path

from apps.orders.views import IndividualCheckoutView, LegalCheckoutView

urlpatterns = [
    path("orders/checkout/legal/", LegalCheckoutView.as_view(), name="checkout-legal"),
    path(
        "orders/checkout/individual/",
        IndividualCheckoutView.as_view(),
        name="checkout-individual",
    ),
]
