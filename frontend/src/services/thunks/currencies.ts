import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/api";
import {ICurrencyMarketData} from "../../utils/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export const getAllCurrencies = createAsyncThunk(
    'currencies/getAllCurrenciesStatus',
    async () => {
        return await axios.get<ICurrencyMarketData[]>(BASE_URL + 'coins/markets').then(r => r.data)
    }
)