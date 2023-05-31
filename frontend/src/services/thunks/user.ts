import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL, request} from "../../utils/api";
import {IUser} from "../../utils/types";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const login = createAsyncThunk(
    'auth/loginStatus',
    async (arg: IUser) => {
        return await axios.post<IUser>(`${BASE_URL}auth`, {
            "username": arg.username,
            "password": arg.password
        }).then((r) => r.data)
    }
)

export const getUser = createAsyncThunk(
    'user/getUserStatus',
    async () => {
        return await axios.get<IUser>(`${BASE_URL}user`).then(r => r
            .data)
    }
)

export const register = createAsyncThunk(
    'auth/registerStatus',
    async (arg: IUser) => {
        return await axios.post<IUser>(BASE_URL + 'registration', {
            "email": arg.email,
            "password": arg.password,
            "username": arg.username
        }).then(r => r.data)
    }
)


export const logout = createAsyncThunk(
    'auth/logoutStatus',
    async () => {
        return await axios.get(BASE_URL + 'logout').then(r=>r.data)
    }
)

