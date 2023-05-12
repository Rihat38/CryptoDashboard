from rest_framework import serializers
from .models import CryptoCurrency, CryptoCurrencyMarketInfo


class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = '__all__'


class CryptoCurrencyMarketInfoSerializer(serializers.ModelSerializer):
    id = serializers.CharField()

    class Meta:
        model = CryptoCurrencyMarketInfo
        fields = '__all__'
