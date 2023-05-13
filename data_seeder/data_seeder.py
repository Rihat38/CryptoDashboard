from datetime import timezone
import requests
from django.utils import timezone
from datetime import datetime
from api.models import Coin, CoinMarketInfo, CoinOHLC


def update_coin_ohlc(coin_id, coin_obj_id):
    # Получаем данные OHLC для заданной криптовалюты и периода времени из CoinGecko API
    url = f"https://api.coingecko.com/api/v3/coins/{coin_id}/ohlc"
    params = {
        'vs_currency': 'usd',
        'days': 90
    }
    response = requests.get(url, params=params)

    # Парсим JSON-ответ и сохраняем данные OHLC в базе данных
    ohlc_data = response.json()
    ohlc_list = []
    for data in ohlc_data:
        time = datetime.fromtimestamp(data[0] / 1000)
        open = data[1]
        high = data[2]
        low = data[3]
        close = data[4]
        ohlc = CoinOHLC(
            coin_id=coin_obj_id,
            time=time,
            open=open,
            high=high,
            low=low,
            close=close
        )
        print(ohlc)
        ohlc_list.append(ohlc)
    CoinOHLC.objects.bulk_create(ohlc_list)


def update_database():
    try:
        # Получаем данные о криптовалютах из CoinGecko API
        url = 'https://api.coingecko.com/api/v3/coins/markets'
        params = {
            'vs_currency': 'usd',
            'order': 'market_cap_desc',
            'per_page': 10,
            'page': 1,
            'sparkline': False
        }
        response = requests.get(url, params=params)

        # Парсим JSON и сохраняем в экземпляр CoinMarketInfo или обновляем существующий экземпляр
        coins_data = response.json()
        for data in coins_data:
            try:
                # Ищем существующий экземпляр CoinMarketInfo по имени криптовалюты
                market_info = CoinMarketInfo.objects.get(name=data['name'])
            except CoinMarketInfo.DoesNotExist:
                market_info = CoinMarketInfo(name=data['name'])

            # Обновляем данные экземпляра CoinMarketInfo
            market_info.current_price = data['current_price']
            market_info.market_cap = data['market_cap']
            market_info.total_volume = data['total_volume']
            market_info.price_change_24h = data['price_change_24h']
            market_info.market_cap_change_24h = data['market_cap_change_24h']
            market_info.circulating_supply = data['circulating_supply']

            last_updated = datetime.strptime(data['last_updated'], '%Y-%m-%dT%H:%M:%S.%fZ')
            last_updated = last_updated.replace(tzinfo=timezone.utc)

            market_info.last_updated = last_updated
            market_info.save()

            # Создаем экземпляр Coin и связываем его с экземпляром CoinMarketInfo, если это необходимо
            coin, created = Coin.objects.get_or_create(name=data['name'], symbol=data['symbol'])
            if created or coin.market_info != market_info:
                coin.image = data['image']
                coin.market_info = market_info
                coin.save()

            update_coin_ohlc(coin_id=data['id'], coin_obj_id=coin.id)
    except TypeError:
        print(TypeError)