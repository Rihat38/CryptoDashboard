from django.db import models


class CryptoCurrency(models.Model):
    name = models.CharField(max_length=40, default="UFO")
    time = models.TimeField()
    open = models.DecimalField(max_digits=20, decimal_places=8)
    high = models.DecimalField(max_digits=20, decimal_places=8)
    low = models.DecimalField(max_digits=20, decimal_places=8)
    close = models.DecimalField(max_digits=20, decimal_places=8)

    def __str__(self):
        return self.time
