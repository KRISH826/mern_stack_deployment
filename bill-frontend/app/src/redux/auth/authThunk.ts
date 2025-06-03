/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authApi";

export const login = createAsyncThunk(
    '/user/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            return await loginApi(email, password);
        } catch (error: any) {
            // Handle error response from the API
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
)

export const register = createAsyncThunk(
    '/user/register',
    async ({name, email, password}: {name: string; email: string; password: string}, thunkAPI) => {
        try {
            return await registerApi(name, email, password);
        } catch (error: any) {
            // Handle error response from the API
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
)