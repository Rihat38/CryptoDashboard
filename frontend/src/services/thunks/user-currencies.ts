import {createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {INamedObject, ISubscribeResponse, IUnsubscribeResponse} from "../../utils/types";

export const getUserFavouriteCurrencies = createAsyncThunk(
    'userCurrencies/getUserFavouriteCurrenciesStatus',
    async () => {
        return await request<INamedObject[]>('user/favorites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    }
)

export const subscribeToCoin = createAsyncThunk(
    'userCurrencies/subscribeToCoinStatus',
    async (coinId: string) => {
        return await request<ISubscribeResponse>(`user/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "coinId": coinId
            })
        })
    }
)

export const unSubscribeFromCoin = createAsyncThunk(
    'userCurrencies/unSubscribeFromCoinStatus',
    async (coinId: string) => {
        return await request<IUnsubscribeResponse>(`user/favorites`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "coinId": coinId
            })
        })
    }
)