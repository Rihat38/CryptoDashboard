from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    forecast = models.JSONField(verbose_name='Прогноз')
    forecast_date = models.DateTimeField(verbose_name='Дата прогноза')
