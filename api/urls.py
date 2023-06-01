from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from api.views import main_view, analytics_view, coin_market_view, registration_view, auth_view, logout_view, \
    prediction_view, coin_detailed_view, user_favorites_view, user_view, EditImagesView, EditUserView

urlpatterns = [
    path("", main_view),
    path("analytics", analytics_view),
    path("coins/markets", coin_market_view),
    path("registration", registration_view),
    path("auth", auth_view),
    path("logout", logout_view),
    path("prediction", prediction_view),
    path("detailed", coin_detailed_view),
    path("favorites", user_favorites_view),
    path("edit/images", EditImagesView.as_view()),
    path('edit/user', EditUserView.as_view()),
    path("user", user_view),
]

urlpatterns += static(settings.MEDIA_ROOT, document_root=settings.MEDIA_ROOT)