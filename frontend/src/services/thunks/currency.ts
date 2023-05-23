import {createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {ICurrency, ICurrencyOHLC} from "../../utils/types";

export const getCurrencyOHLC = createAsyncThunk(
    'currency/getCurrencyOHLCStatus',
    async (name: string) => {
        return await request<ICurrencyOHLC[]>(`analytics?cur_id=${name}&vs_currency=usd`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }
)

export const getCurrencyOHLCForCompare = createAsyncThunk(
    'currency/getCurrencyOHLCForCompareStatus',
    async (name: string) => {
        return await request<ICurrencyOHLC[]>(`analytics?cur_id=${name}&vs_currency=usd`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }
)

export const predict = createAsyncThunk(
    'currency/predictStatus',
    async (id: string) => {
        return await request<ICurrencyOHLC[]>(`prediction?cur_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    }
)