from django.contrib.auth import get_user_model
from rest_framework import serializers
from api.models import FavoriteCrypto, UserProfile

User = get_user_model()

class CurrencyOHLCSerializer(serializers.Serializer):
    time = serializers.IntegerField()
    open = serializers.DecimalField(max_digits=10, decimal_places=2)
    high = serializers.DecimalField(max_digits=10, decimal_places=2)
    low = serializers.DecimalField(max_digits=10, decimal_places=2)
    close = serializers.DecimalField(max_digits=10, decimal_places=2)


class CurrencyOHLCToClientSerializer(serializers.Serializer):
    name = serializers.CharField()
    time = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)


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
    price_change_percentage_24h = serializers.DecimalField(max_digits=64, decimal_places=8)
    circulating_supply = serializers.DecimalField(max_digits=128, decimal_places=8)
    last_updated = serializers.TimeField()
    high_24h = serializers.DecimalField(max_digits=128, decimal_places=8)
    low_24h = serializers.DecimalField(max_digits=128, decimal_places=8)
    total_supply = serializers.DecimalField(max_digits=128, decimal_places=8)
    max_supply = serializers.DecimalField(max_digits=128, decimal_places=8)
    market_cap_change_percentage_24h = serializers.DecimalField(max_digits=128, decimal_places=8)


class CurrencyLinksSerializer(serializers.Serializer):
    homepage = serializers.ListField(child=serializers.CharField())
    blockchain_site = serializers.ListField(child=serializers.CharField())
    official_forum_url = serializers.ListField(child=serializers.CharField())
    subreddit_url = serializers.CharField()
    repos_url = serializers.DictField(
        child=serializers.ListField(child=serializers.CharField()))


class CurrencyDetailedSerializer(serializers.Serializer):
    id = serializers.CharField()
    symbol = serializers.CharField()
    name = serializers.CharField()
    description = serializers.DictField(child=serializers.CharField())
    links = CurrencyLinksSerializer()
    image = serializers.DictField(
        child=serializers.CharField())
    market_cap_rank = serializers.IntegerField()
    last_updated = serializers.CharField()


class FavoriteCryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCrypto
        fields = ('id', 'name')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['avatar', 'background']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
