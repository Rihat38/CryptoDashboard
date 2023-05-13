from rest_framework import serializers


class CoinMarketInfoSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=64)
    name = serializers.CharField(max_length=40)
    symbol = serializers.CharField(max_length=40)
    image = serializers.CharField(max_length=512)
    current_price = serializers.DecimalField(max_digits=128, decimal_places=8)
    market_cap = serializers.DecimalField(max_digits=128, decimal_places=8)
    total_volume = serializers.DecimalField(max_digits=128, decimal_places=8)
    price_change_24h = serializers.DecimalField(max_digits=128, decimal_places=8)
    market_cap_change_24h = serializers.DecimalField(max_digits=128, decimal_places=8)
    circulating_supply = serializers.DecimalField(max_digits=128, decimal_places=8)
    last_updated = serializers.TimeField()
