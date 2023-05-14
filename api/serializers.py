from rest_framework import serializers

from .models import Coin, CoinMarketInfo


class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = '__all__'


class CoinMarketInfoSerializer(serializers.ModelSerializer):
    id = serializers.CharField()

    class Meta:
        model = CoinMarketInfo
        fields = '__all__'


class CurrencyOHLCSerializer(serializers.Serializer):
    time = serializers.IntegerField()
    open = serializers.DecimalField(max_digits=10, decimal_places=2)
    high = serializers.DecimalField(max_digits=10, decimal_places=2)
    low = serializers.DecimalField(max_digits=10, decimal_places=2)
    close = serializers.DecimalField(max_digits=10, decimal_places=2)


class CurrencyOHLCToClientSerializer(serializers.Serializer):
    name = serializers.CharField()
    time = serializers.IntegerField()
    gdp = serializers.DecimalField(max_digits=10, decimal_places=2)


