import {ICurrencyDetailed} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";
import {getCurrencyDetailed} from "../thunks/currency";

interface ICurrencyState {
    currentCurrencyDetailed: ICurrencyDetailed | null,
    requested: boolean,
    failed: boolean,
    success: boolean
}

const initialState: ICurrencyState = {
    currentCurrencyDetailed: null,
    requested: false,
    failed: false,
    success: false
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getCurrencyDetailed.fulfilled, (state, action) => {
            state.requested = false
            state.failed = false
            state.success = true

            state.currentCurrencyDetailed = action.payload
        })
        .addCase(getCurrencyDetailed.pending, (state, action) => {
            state.requested = true
            state.failed = false
            state.success = false
        })
        .addCase(getCurrencyDetailed.rejected, (state, action) => {
            state.requested = false
            state.failed = true
            state.success = false

            console.error(action.payload)
        })
})

export default currencySlice.reducer
