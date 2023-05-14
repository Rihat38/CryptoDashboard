import {createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {ICurrency} from "../../utils/types";

export const getAllCurrencies = createAsyncThunk(
    'currencies/getAllCurrenciesStatus',
    async () => {
        return await request<ICurrency[]>('coins/markets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }
)