from rest_framework.decorators import api_view
from rest_framework.response import Response

from .api_client import get_coin_market_data
from .serializers import CoinMarketInfoSerializer

BASE_URL = 'https://api.coingecko.com/api/v3'

COIN_IDS = ["bitcoin", "ethereum", "litecoin", "dogecoin", "tether", "solana", "tron"]


@api_view(['GET'])
def main_view(request):
    return Response({'status': 'ok'})


@api_view(['GET'])
def analytics_view(request):
    return Response({})


@api_view(['GET'])
def coin_market_view(request):
    vs_currency = "usd"

    coin_data = get_coin_market_data(COIN_IDS, vs_currency)

    if coin_data:
        serializer = CoinMarketInfoSerializer(coin_data, many=True)
        return Response(serializer.data)
    else:
        return Response(status=500)


