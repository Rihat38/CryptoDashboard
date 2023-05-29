import {INamedObject} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";
import {getUserFavouriteCurrencies, subscribeToCoin, unSubscribeFromCoin} from "../thunks/user-currencies";

interface ICurrenciesState {
    favourites: INamedObject[],
    requested: boolean,
    success: boolean,
    failed: boolean
}

const initialState: ICurrenciesState = {
    favourites: [],
    requested: false,
    success: false,
    failed: false
}

export const userCurrenciesSlice = createSlice({
    name: 'userCurrencies',
    initialState,
    reducers: {
        subscribeToCoin: (state, action) => {
            console.log('subscribe',action.payload)
        },
        unSubscribeFromCoin: (state, action) => {
            console.log('unsubscribe',action.payload)
        },
    },
    extraReducers: builder => builder
        .addCase(getUserFavouriteCurrencies.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false

            state.favourites = action.payload
        })
        .addCase(getUserFavouriteCurrencies.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getUserFavouriteCurrencies.rejected, (state, action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })
        .addCase(subscribeToCoin.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false

            state.favourites!.push(action.payload.coin)
        })
        .addCase(unSubscribeFromCoin.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false

            state.favourites = state.favourites.filter(el => el.name !== action.payload.name)
        })
})

export default userCurrenciesSlice.reducer
