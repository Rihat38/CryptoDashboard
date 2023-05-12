from django.db import models


class CoinMarketInfo(models.Model):
    current_price = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    market_cap = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    total_volume = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    price_change_24h = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    market_cap_change_24h = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    circulating_supply = models.DecimalField(max_digits=20, decimal_places=8, null=True)
    last_updated = models.TimeField()


class Coin(models.Model):
    name = models.CharField(max_length=40)
    symbol = models.CharField(max_length=18)
    image = models.CharField(max_length=256)

    marketInfo = models.OneToOneField(CoinMarketInfo, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class CoinOHLC(models.Model):
    time = models.TimeField()
    open = models.DecimalField(max_digits=64, decimal_places=8)
    high = models.DecimalField(max_digits=64, decimal_places=8)
    low = models.DecimalField(max_digits=64, decimal_places=8)
    close = models.DecimalField(max_digits=64, decimal_places=8)

    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)



