from django.urls import path

from api.views import main_view, analytics_view, coin_market_view, prediction_view

urlpatterns = [
    path("", main_view),
    path("analytics", analytics_view),
    path("coins/markets", coin_market_view),
    path("prediction", prediction_view)
]
