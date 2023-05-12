import {ICurrencyInfo} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";

interface ICurrencyState {
    currentCurrency: ICurrencyInfo | null
}

const initialState: ICurrencyState = {
    currentCurrency: null
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action) => {
            state.currentCurrency = action.payload
        },
        removeCurrentCurrency: (state) => {
            state.currentCurrency = null
        }
    }
})

export const {setCurrentCurrency, removeCurrentCurrency} = currencySlice.actions

export default currencySlice.reducer
