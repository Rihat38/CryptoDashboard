import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/api";
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
        return await axios.get(BASE_URL + 'logout').then(r => r.data)
    }
)

export const editImages = createAsyncThunk(
    'user/editImagesStatus',
    async ({avatar, banner}: {avatar: any, banner: any}) => {
        console.log(avatar, banner, 'patch')
        let form_data = new FormData();
        if (avatar){
            form_data.append("avatar", avatar, avatar.name);
        }
        if(banner){
            form_data.append("background", banner, banner.name);
        }
        return await axios.patch(BASE_URL + 'edit/images', form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => r.data)
    }
)

export const editUser = createAsyncThunk(
    'user/editUserStatus',
    async ({email, username}: {email: string, username: string}) => {
        return await axios.patch(BASE_URL + 'edit/user', {email,username}).then(r => r.data)
    }
)
