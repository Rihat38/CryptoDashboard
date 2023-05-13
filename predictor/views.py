from sklearn.linear_model import LinearRegression
from api.api_client import get_coin_market_data
import pandas as pd


def predict_price(request):
    if request.method == 'GET':
        date = request.GET.get('date')

        # Получаем данные OHLC, Volume, Marketcap для заданной даты
        data = get_coin_market_data()

        # Преобразуем данные в формат pandas DataFrame
        df = pd.DataFrame(list(data))

        # Обучаем модель Linear Regression на исторических данных
        X = df[['high_price', 'low_price', 'volume', 'marketcap']]
        y = df['close_price']
        model = LinearRegression().fit(X, y)

    return model