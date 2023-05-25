import {createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {ICurrencyMarketData} from "../../utils/types";

export const getAllCurrencies = createAsyncThunk(
    'currencies/getAllCurrenciesStatus',
    async () => {
        return await request<ICurrencyMarketData[]>('coins/markets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }
)