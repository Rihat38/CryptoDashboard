import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import requests


def prediction_view(request):
    # Замените 'bitcoin' на символ криптовалюты, которую вы хотите прогнозировать
    crypto_symbol = 'bitcoin'

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
    model = ARIMA(df['price'], order=(1, 1, 1))
    model_fit = model.fit()
    forecast = model_fit.predict(start=len(df), end=len(df) + 30)

    # Преобразование прогнозных значений в JSON
    forecast_json = forecast.to_json()

    # Вывод прогнозных значений в формате JSON
    return forecast_json
