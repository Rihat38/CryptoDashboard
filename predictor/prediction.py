import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import requests


def predict(crypto_symbol):
    # Получение информации о криптовалюте с помощью Coingecko API
    info_url = f'https://api.coingecko.com/api/v3/coins/{crypto_symbol}'
    info_response = requests.get(info_url)
    info_data = info_response.json()
    crypto_name = info_data['name']

    # Получение исторических данных о цене криптовалюты с помощью Coingecko API
    url = f'https://api.coingecko.com/api/v3/coins/{crypto_symbol}/market_chart?vs_currency=usd&days=365'
    response = requests.get(url)
    data = response.json()
    prices = data['prices']

    # Преобразование данных в формат DataFrame
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    df.set_index('timestamp', inplace=True)

    # Прогнозирование с помощью модели ARIMA
    model = ARIMA(df['price'], order=(2, 1, 2))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=30)

    # Создание списка словарей с прогнозными данными
    forecast_data = []
    forecast_dates = pd.date_range(start=df.index[-1], periods=30, freq='D')
    for date, price in zip(forecast_dates, forecast):
        forecast_entry = {
            'name': crypto_name,
            'time': date.strftime('%Y-%m-%d'),
            'price': price
        }
        forecast_data.append(forecast_entry)

    return forecast_data
