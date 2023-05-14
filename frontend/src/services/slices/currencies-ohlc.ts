import {createSlice} from "@reduxjs/toolkit";
import {getAllCurrencies} from "../thunks/currencies";
import {ICurrencyOHLC} from "../../utils/types";
import {getCurrencyOHLC} from "../thunks/currency";


interface ICurrenciesOHLCState {
    currencyOHLC: ICurrencyOHLC[] | null,
    requested: boolean,
    success: boolean,
    failed: boolean
}

const initialState: ICurrenciesOHLCState = {
    currencyOHLC: [],
    requested: false,
    success: false,
    failed: false
}

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getCurrencyOHLC.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false
            console.log(action.payload)
            state.currencyOHLC = action.payload
        })
        .addCase(getCurrencyOHLC.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getCurrencyOHLC.rejected, (state,action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
})

export default currenciesSlice.reducer
