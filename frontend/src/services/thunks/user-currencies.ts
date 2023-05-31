import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL, request} from "../../utils/api";
import {INamedObject, ISubscribeResponse, IUnsubscribeResponse} from "../../utils/types";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getUserFavouriteCurrencies = createAsyncThunk(
    'userCurrencies/getUserFavouriteCurrenciesStatus',
    async () => {
        return await axios.get<INamedObject[]>(BASE_URL + 'favorites').then(r=>r.data)
    }
)

export const subscribeToCoin = createAsyncThunk(
    'userCurrencies/subscribeToCoinStatus',
    async (coinId: string) => {
        return await axios.post<ISubscribeResponse>(BASE_URL + `favorites`, {
            "coinId": coinId
        }).then(r=>r.data)
    }
)

export const unSubscribeFromCoin = createAsyncThunk(
    'userCurrencies/unSubscribeFromCoinStatus',
    async (coinId: string) => {
        return await axios.put<IUnsubscribeResponse>(BASE_URL+`favorites`, {
                "coinId": coinId
        }).then(r=>r.data)
    }
)