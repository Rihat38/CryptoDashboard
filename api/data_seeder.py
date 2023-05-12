import requests
from decimal import Decimal
from datetime import datetime
from api.models import Coin, CoinMarketInfo, CoinOHLC
import schedule
import time


def update_database():
    # 1. Получите список монет и их информацию из CoinGecko API.
    coin_api_url = 'https://api.coingecko.com/api/v3/coins'
    coins = requests.get(coin_api_url).json()
    print(coins)

    for coin_data in coins:
        # 2. Проверьте каждую монету на наличие в базе данных.
        coin_id = coin_data['id']
        coin_market_data = requests.get(f'https://api.coingecko.com/api/v3/coins/{coin_id}').json()

        try:
            coin = Coin.objects.get(name=coin_market_data['name'])
            coin_market_info = coin.marketInfo
        except Coin.DoesNotExist:
            # 3. Если монета еще не добавлена в базу данных, то создайте новый объект `Coin` и свяжите его с объектом `CoinMarketInfo`.
            coin = Coin.objects.create(name=coin_market_data['name'], symbol=coin_data['symbol'], image=coin_data['image'])
            coin_market_info = CoinMarketInfo.objects.create(coin=coin)

        # 4. Если монета уже присутствует в базе данных, то обновите информацию в объекте `CoinMarketInfo`.
        current_price = Decimal(coin_data['current_price'])
        market_cap = Decimal(coin_data['market_cap'])
        total_volume = Decimal(coin_data['total_volume'])
        price_change_24h = Decimal(coin_data['price_change_24h'])
        market_cap_change_24h = Decimal(coin_data['market_cap_change_24h'])
        circulating_supply = Decimal(coin_data['circulating_supply'])
        last_updated = datetime.fromtimestamp(coin_data['last_updated'])

        coin_market_info.current_price = current_price
        coin_market_info.market_cap = market_cap
        coin_market_info.total_volume = total_volume
        coin_market_info.price_change_24h = price_change_24h
        coin_market_info.market_cap_change_24h = market_cap_change_24h
        coin_market_info.circulating_supply = circulating_supply
        coin_market_info.last_updated = last_updated
        coin_market_info.save()

        # 5. Получите OHLC данные для каждой монеты и добавьте их в таблицу `CoinOHLC`.
        ohlc_data = requests.get(f'https://api.coingecko.com/api/v3/coins/{coin_id}/ohlc?vs_currency=usd').json()
        ohlc_objects = []

        for ohlc in ohlc_data:
            time = datetime.fromtimestamp(ohlc[0] / 1000)
            open_price = Decimal(ohlc[1])
            high_price = Decimal(ohlc[2])
            low_price = Decimal(ohlc[3])
            close_price = Decimal(ohlc[4])
            ohlc_object = CoinOHLC(coin=coin, time=time, open=open_price, high=high_price, low=low_price, close=close_price)
            ohlc_objects.append(ohlc_object)

        CoinOHLC.objects.bulk_create(ohlc_objects)


INTERVAL = 1


def start():
    update_database()
    schedule.every(INTERVAL).minutes.do(update_database)

    while True:
        schedule.run_pending()
        time.sleep(1)
