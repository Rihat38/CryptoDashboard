import requests


def get_currency_for_days(coin_id, vs_currency, days):

    url = f'https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency={vs_currency}&days={days}'

    headers = {
        'Accepts': 'application/json',
        'X-CoinGecko-API-Key': 'YOUR_API_KEY'
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    prices = data['prices']

def get_coin_market_data(coin_ids, vs_currency):
    url = f"https://api.coingecko.com/api/v3/coins/markets?vs_currency={vs_currency}"
    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        return data
    else:
        print(f"Ошибка при получении данных: {response.status_code}")
        return None


def get_coin_ids():
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    data = response.json()
    print(data)
    result = [el["id"] for el in data]
    if response.status_code == 200:
        return result
    else:
        print(f"Ошибка при получении данных: {response.status_code}")
        return None
