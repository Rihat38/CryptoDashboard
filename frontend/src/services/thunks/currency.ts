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