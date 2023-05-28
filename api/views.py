from datetime import datetime
from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from predictor.prediction import predict
from .models import Prediction, FavoriteCrypto
from .serializers import CoinMarketInfoSerializer, CurrencyOHLCSerializer, CurrencyOHLCToClientSerializer, \
    CurrencyDetailedSerializer, FavoriteCryptoSerializer
import json

User = get_user_model()

BASE_URL = 'https://api.coingecko.com/api/v3'
from .api_client import get_coin_market_data, get_currency_ohlc, get_currency_detailed

COIN_IDS = ["bitcoin", "ethereum", "litecoin", "dogecoin", "tether", "solana", "tron"]


@api_view(['GET'])
def main_view(request):
    return Response({'status': 'ok'})


@api_view(['GET'])
def analytics_view(request):
    cur_id = request.GET.get('cur_id')
    vs_currency = request.GET.get('vs_currency')

    ohlc_data = get_currency_ohlc(cur_id, vs_currency, 365)

    if ohlc_data:
        serialized_data = []
        serialized_data_for_client = []
        for item in ohlc_data:
            serialized_item = CurrencyOHLCSerializer({
                'time': item[0],
                'open': item[1],
                'high': item[2],
                'low': item[3],
                'close': item[4]
            })
            serialized_data.append(serialized_item.data)
            serialized_item_for_client = CurrencyOHLCToClientSerializer({
                'name': cur_id,
                'time': datetime.fromtimestamp(item[0] / 1000).strftime('%Y-%m-%d'),
                'price': float(item[4])
            })
            serialized_data_for_client.append(serialized_item_for_client.data)
        return Response(serialized_data_for_client, status=200)
    else:
        Response("Проблемы при получении данных из API")


@api_view(['GET'])
def coin_market_view(request):
    vs_currency = "usd"

    coin_data = get_coin_market_data(vs_currency)

    if coin_data:
        serializer = CoinMarketInfoSerializer(coin_data, many=True)
        return Response(serializer.data)
    else:
        return Response(status=500)


@api_view(['GET'])
def coin_detailed_view(request):
    coin_data = get_currency_detailed(cur_id=request.GET.get('cur_id'))
    if coin_data:
        serializer = CurrencyDetailedSerializer(coin_data)
        return Response(serializer.data)
    else:
        return Response(status=500)


@api_view(['POST'])
def registration_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    user = User(
        username=username,
        email=email,
    )
    user.set_password(password)
    user.save()
    return Response({'message': 'Регистрация прошла успешно'})


@api_view(['POST'])
def auth_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Аутентификация прошла успешно'})
    else:
        return Response({'message': 'Неверные учетные данные'}, status=400)


def logout_view(request):
    logout(request)
    return Response(status=200)


@api_view(['GET'])
def prediction_view(request):
    cur_id = request.GET.get('cur_id')
    prediction = predict(crypto_symbol=cur_id)
    if prediction:
        forecast = json.dumps(prediction)
        # user = request.user
        # forecast_date = datetime.now()
        # prediction_model = Prediction(forecast_date=forecast_date, forecast=forecast, user=user)
        # prediction_model.save()
        return Response(prediction)
    else:
        return Response(status=500)


@api_view(['GET', 'POST', 'PUT'])
def user_favorites_view(request):
    if request.method == 'GET':
        # user = request.user
        user = User.objects.first()
        favorites = FavoriteCrypto.objects.filter(user=user)
        serializer = FavoriteCryptoSerializer(favorites, many=True)
        print(serializer.data)
        return Response(serializer.data)

    if request.method == 'POST':
        # user = request.user
        user = User.objects.first()
        data = json.loads(request.body)
        favorites = FavoriteCrypto.objects
        created = favorites.create(name=data["coinId"], user=user)
        serializer = FavoriteCryptoSerializer(created)

        return Response({'status': 'success',
                         'name': data["coinId"],
                         'coin': serializer.data,
                         'message': 'Object successfully created.'})

    if request.method == 'PUT':
        # user = request.user
        user = User.objects.first()
        data = json.loads(request.body)
        favorite = FavoriteCrypto.objects.get(user=user, name=data["coinId"])
        favorite.delete()

        return Response({'status': 'success', 'name': data["coinId"], 'message': 'Object successfully deleted.'})
