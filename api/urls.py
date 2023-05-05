from django.urls import path

from api.views import main_view

urlpatterns = [
    path("", main_view),
    path("analytics", main_view)
]
