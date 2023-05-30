from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    forecast = models.JSONField(verbose_name='Прогноз')
    forecast_date = models.DateTimeField(verbose_name='Дата прогноза')


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', default='default_avatar.png', null=True, blank=True)
    background = models.ImageField(upload_to='backgrounds/', default='default_background.png', null=True, blank=True)


class FavoriteCrypto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(primary_key=False)

    class Meta:
        unique_together = ('name', 'user')
