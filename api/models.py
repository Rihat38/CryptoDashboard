from django.db import models


class CoinMarketInfo(models.Model):
    name = models.CharField(max_length=40)
    current_price = models.DecimalField(max_digits=128, decimal_places=8)
    market_cap = models.DecimalField(max_digits=128, decimal_places=8)
    total_volume = models.DecimalField(max_digits=128, decimal_places=8)
    price_change_24h = models.DecimalField(max_digits=128, decimal_places=8)
    market_cap_change_24h = models.DecimalField(max_digits=128, decimal_places=8)
    circulating_supply = models.DecimalField(max_digits=128, decimal_places=8)
    last_updated = models.TimeField()


class Coin(models.Model):
    name = models.CharField(max_length=40)
    symbol = models.CharField(max_length=18)
    image = models.CharField(max_length=256)

    market_info = models.ForeignKey(CoinMarketInfo, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class CoinOHLC(models.Model):
    time = models.TimeField()
    open = models.DecimalField(max_digits=128, decimal_places=8)
    high = models.DecimalField(max_digits=128, decimal_places=8)
    low = models.DecimalField(max_digits=128, decimal_places=8)
    close = models.DecimalField(max_digits=128, decimal_places=8)

    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)



