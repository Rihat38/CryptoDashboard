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
