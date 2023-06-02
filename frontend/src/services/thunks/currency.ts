import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL, request} from "../../utils/api";
import {ICurrencyDetailed, ICurrencyOHLC} from "../../utils/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export const getCurrencyDetailed = createAsyncThunk(
    'currency/getCurrencyDetailedStatus',
    async (name: string) => {
        return await axios.get<ICurrencyDetailed>(BASE_URL+`detailed?cur_id=${name}`).then(r=>r.data)
    }
)

export const getCurrencyOHLC = createAsyncThunk(
    'currency/getCurrencyOHLCStatus',
    async (name: string) => {
        return await axios.get<ICurrencyOHLC[]>(BASE_URL+`analytics?cur_id=${name}&vs_currency=usd`).then(r=>r.data)
    }
)

export const getCurrencyOHLCForCompare = createAsyncThunk(
    'currency/getCurrencyOHLCForCompareStatus',
    async (name: string) => {
        return await axios.get<ICurrencyOHLC[]>(BASE_URL+`analytics?cur_id=${name}&vs_currency=usd`).then(r=>r.data)
    }
)

export const predict = createAsyncThunk(
    'currency/predictStatus',
    async (id: string) => {
        return await axios.get<ICurrencyOHLC[]>(BASE_URL+`prediction?cur_id=${id}`).then(r=>r.data)
    }
)