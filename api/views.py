from rest_framework.decorators import api_view
from rest_framework.response import Response

from .api_client import get_coin_market_data
from .models import Coin
from .serializers import CryptoCurrencySerializer, CoinMarketInfoSerializer

BASE_URL = 'https://api.coingecko.com/api/v3'


@api_view(['GET'])
def main_view(request):
    return Response({'status': 'ok'})


@api_view(['GET'])
def analytics_view(request):
    cryptocurrencies = Coin.objects.all()
    serializer = CryptoCurrencySerializer(cryptocurrencies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def coin_market_view(request):
    coin_ids = ["bitcoin", "ethereum", "litecoin"]
    vs_currency = "usd"
    
    coin_data = get_coin_market_data(coin_ids, vs_currency)

    if coin_data:
        serializer = CoinMarketInfoSerializer(coin_data, many=True)
        return Response(serializer.data)
    else:
        return Response(status=500)
