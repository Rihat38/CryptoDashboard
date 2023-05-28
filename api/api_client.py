import requests


BASE_URL = 'https://api.coingecko.com/api/v3'


def get_currency_for_days(coin_id, vs_currency, days):
    url = f'{BASE_URL}/coins/{coin_id}/market_chart?vs_currency={vs_currency}&days={days}'

    headers = {
        'Accepts': 'application/json',
        'X-CoinGecko-API-Key': 'YOUR_API_KEY'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    prices = data['prices']


def get_coin_market_data(vs_currency):
    url = f"{BASE_URL}/coins/markets?vs_currency={vs_currency}"

    response = requests.get(url)
    data = response.json()

    return_data_or_exception_info(response.status_code, data)


def get_currency_ohlc(cur_id, vs_currency, days_count):
    api_method = f"/coins/{cur_id}/ohlc?vs_currency={vs_currency}&days={days_count}"
    response = requests.get(BASE_URL + api_method)
    data = response.json()

    return_data_or_exception_info(response.status_code, data)


def get_currency_detailed(cur_id):
    api_method = f"/coins/{cur_id}?localization=true&tickers=false&market_data=false"
    response = requests.get(BASE_URL + api_method)
    data = response.json()

    return_data_or_exception_info(response.status_code, data)


def get_coin_ids():
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    data = response.json()
    print(data)
    result = [el["id"] for el in data]
    return_data_or_exception_info(response.status_code, result)


def return_data_or_exception_info(status_code, data):
    if status_code == 200:
        return data
    elif status_code == 429:
        print(f"Привышено количество запросов к API: {status_code}")
        return None
    else:
        print(f"Ошибка при получении данных: {status_code}")
        return None