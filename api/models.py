from django.db import models


class CryptoCurrencyMarketInfo(models.Model):
    current_price = models.DecimalField(max_digits=20, decimal_places=8)
    market_cap = models.DecimalField(max_digits=20, decimal_places=8)
    total_volume = models.DecimalField(max_digits=20, decimal_places=8)
    price_change_24h = models.DecimalField(max_digits=20, decimal_places=8)
    market_cap_change_24h = models.DecimalField(max_digits=20, decimal_places=8)
    circulating_supply = models.DecimalField(max_digits=20, decimal_places=8)
    last_updated = models.TimeField()


class CryptoCurrency(models.Model):
    coin_id = models.CharField()
    name = models.CharField(max_length=40, default="UFO")
    symbol = models.CharField(max_length=18)
    image = models.CharField(max_length=120)
    time = models.TimeField()
    open = models.DecimalField(max_digits=20, decimal_places=8)
    high = models.DecimalField(max_digits=20, decimal_places=8)
    low = models.DecimalField(max_digits=20, decimal_places=8)
    close = models.DecimalField(max_digits=20, decimal_places=8)
    marketInfo = models.OneToOneField(CryptoCurrencyMarketInfo, on_delete=models.CASCADE)

    def __str__(self):
        return self.time
