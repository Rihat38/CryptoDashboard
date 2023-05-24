import {ICurrencyMarketData} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";
import {getAllCurrencies} from "../thunks/currencies";

interface ICurrenciesState {
    currencies: ICurrencyMarketData[] | null,
    requested: boolean,
    success: boolean,
    failed: boolean
}

const initialState: ICurrenciesState = {
    currencies: [],
    requested: false,
    success: false,
    failed: false
}

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllCurrencies.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false
            console.log(action.payload)
            state.currencies = action.payload
        })
        .addCase(getAllCurrencies.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getAllCurrencies.rejected, (state,action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
})

export default currenciesSlice.reducer
