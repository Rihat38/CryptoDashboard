from rest_framework import serializers
from .models import CryptoCurrency


class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = '__all__'


class CoinSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    symbol = serializers.CharField()
    image = serializers.CharField()
    current_price = serializers.FloatField()
    market_cap = serializers.FloatField()
    total_volume = serializers.FloatField()
    price_change_24h = serializers.FloatField()
    market_cap_change_24h = serializers.FloatField()
    circulating_supply = serializers.FloatField()
    last_updated = serializers.DateTimeField()
