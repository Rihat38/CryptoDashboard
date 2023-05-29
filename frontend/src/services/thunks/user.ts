import {createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/api";
import {IUser} from "../../utils/types";

export const login = createAsyncThunk(
		'auth/loginStatus',
		async (arg: IUser) => {
				return await request<IUser>('auth', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json;charset=utf-8'
						},
						body: JSON.stringify({
								"username": arg.username,
								"password": arg.password
						})
				})
		}
)

export const getUser = createAsyncThunk(
		'user/getUserStatus',
		async () => {
				return await request<IUser>('user', {
						method: 'GET',
				})
		}
)

export const register = createAsyncThunk(
		'auth/registerStatus',
		async (arg: IUser) => {
				return await request<IUser>('registration', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json;charset=utf-8'
						},
						body: JSON.stringify({
								"email": arg.email,
								"password": arg.password,
								"username": arg.username
						})
				})
		}
)


export const logout = createAsyncThunk(
		'auth/logoutStatus',
		async () => {
				let token = localStorage.getItem("refreshToken")
				return await request('api/logout', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json;charset=utf-8',
						},
						body: JSON.stringify({
								token: token,
						})
				})
		}
)

