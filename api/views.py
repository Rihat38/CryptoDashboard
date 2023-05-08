from rest_framework.decorators import api_view
from django.contrib.sites import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CryptoCurrency
from .serializers import CryptoCurrencySerializer

BASE_URL = 'https://api.coingecko.com/api/v3'


@api_view(['GET'])
def main_view(request):
    return Response({'status': 'ok'})


@api_view(['GET'])
def analytics_view(request):
    cryptocurrencies = CryptoCurrency
    serializer = CryptoCurrencySerializer(cryptocurrencies, many=True)
    return Response(serializer.data)
