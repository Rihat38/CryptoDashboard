from django.urls import path

from api.views import main_view, analytics_view

urlpatterns = [
    path("", main_view),
    path("analytics", analytics_view)
]
