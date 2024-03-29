import {createSlice} from "@reduxjs/toolkit";
import {editImages, editUser, getUser, login, logout, register} from "../thunks/user";
import {IUser} from "../../utils/types";

interface IUserSlice {
    user: IUser | null,
    isAuthChecked: boolean,
    requested: boolean,
    failed: boolean,
    success: boolean,

    error: any
}

const initialState: IUserSlice = {
    user: null,
    isAuthChecked: false,
    requested: false,
    failed: false,
    success: false,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.requested = false;
                state.success = true;
                state.failed = false;

                state.user = action.payload;
                state.isAuthChecked = true
            })
            .addCase(login.rejected, (state, action) => {
                state.requested = false;
                state.success = false;
                state.failed = true;

                state.error = action.payload
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true
            })
            .addCase(register.rejected, (state, action) => {
                console.log(action.payload)
            })
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear()
                state.user = initialState.user
            })
            .addCase(editImages.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user!.media = action.payload
            })
            .addCase(editUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user! = action.payload
            })
    },
});

export default userSlice.reducer;