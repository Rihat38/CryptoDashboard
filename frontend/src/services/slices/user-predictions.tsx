import {createSlice} from "@reduxjs/toolkit";
import {getUserPredictions} from "../thunks/user-predictions";

interface ICurrenciesState {
    predictions: any[],
    requested: boolean,
    success: boolean,
    failed: boolean
}

const initialState: ICurrenciesState = {
    predictions: [],
    requested: false,
    success: false,
    failed: false
}

export const userPredictionsSlice = createSlice({
    name: 'userPredictions',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.predictions = []
        },
    },
    extraReducers: builder => builder
        .addCase(getUserPredictions.fulfilled, (state, action) => {
            state.requested = false
            state.success = true
            state.failed = false

            state.predictions = action.payload
        })
        .addCase(getUserPredictions.pending, (state) => {
            state.requested = true
            state.success = false
            state.failed = false
        })
        .addCase(getUserPredictions.rejected, (state, action) => {
            state.requested = false
            state.success = false
            state.failed = true

            console.log(action.error)
        })

})

export const {clearFavorites} = userPredictionsSlice.actions
export default userPredictionsSlice.reducer
