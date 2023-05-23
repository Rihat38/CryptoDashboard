import {createSlice} from "@reduxjs/toolkit";
import {ICurrencyOHLC} from "../../utils/types";
import {getCurrencyOHLC, getCurrencyOHLCForCompare, predict} from "../thunks/currency";


interface ICurrenciesOHLCState {
    currencyOHLC: ICurrencyOHLC[],
    compareCurrencyOHLC: ICurrencyOHLC[],
    predicted: ICurrencyOHLC[],
    requested: boolean,
    success: boolean,
    failed: boolean
}

const initialState: ICurrenciesOHLCState = {
    currencyOHLC: [],
    compareCurrencyOHLC: [],
    predicted: [],

    requested: false,
    success: false,
    failed: false
}

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        clearCurrencyOHLCForCompare: (state) => {
            state.compareCurrencyOHLC = []
        },
        clearCurrency: () => {
            return initialState
        }
    },
    extraReducers: builder => builder
        .addCase(getCurrencyOHLC.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false
            state.currencyOHLC = action.payload
        })
        .addCase(getCurrencyOHLC.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getCurrencyOHLC.rejected, (state, action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
        .addCase(getCurrencyOHLCForCompare.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false
            state.compareCurrencyOHLC = action.payload
        })
        .addCase(getCurrencyOHLCForCompare.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getCurrencyOHLCForCompare.rejected, (state, action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
        .addCase(predict.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false
            state.predicted = action.payload.slice(1,action.payload.length).map((el,index) => index === 0? {...state.currencyOHLC.at(-1)!, name: el.name}!: el)
        })
        .addCase(predict.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(predict.rejected, (state, action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
})

export const {clearCurrencyOHLCForCompare, clearCurrency} = currenciesSlice.actions
export default currenciesSlice.reducer
