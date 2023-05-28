import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import currenciesReducer from "./slices/currencies"
import currencyReducer from "./slices/currency"
import currencyOhlcReducer from "./slices/currencies-ohlc"
import userCurrenciesReducer from "./slices/user-currencies"

const rootReducer = combineReducers({
    currencies: currenciesReducer,
    currency: currencyReducer,
    currencyOhlc: currencyOhlcReducer,
    userCurrencies:userCurrenciesReducer
});
export const mainStore = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    })

export type RootState = ReturnType<typeof mainStore.getState>;

export type AppDispatch = typeof mainStore.dispatch;