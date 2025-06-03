import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAddBillApi, getAllBillsApi, getBillApiById, getDeleteBillApi, getUpdateBillApi } from "./billApi";
import { AxiosError } from "axios";
import { Bill } from "@/types/statType";


export const getAllBills = createAsyncThunk(
    '/bills/getallbills',
    async(_: void, thunkAPI) => {
        try {
           return await getAllBillsApi(); 
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Fetch failed');
        }
    }
)

export const getAddBill = createAsyncThunk(
    '/bills/addbill',
    async(data: Bill, thunkAPI) => {
        try {
           return await getAddBillApi(data); 
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Fetch failed');
        }
    }
)

export const getDeleteBill = createAsyncThunk(
    '/bills/deletebill',
    async(id: string, thunkAPI) => {
        try {
           return await getDeleteBillApi(id); 
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Fetch failed');
        }
    }
)

export const getBillById = createAsyncThunk(
    'bills/getbill',
    async(id: string, thunkAPI) => {
        try {
            return await getBillApiById(id);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Fetch failed');
        }
    }
)

export const updateBillById = createAsyncThunk(
    'bills/updatebill',
    async({id, data}: {id: string, data: Bill}, thunkAPI) => {
        try {
            return await getUpdateBillApi(id, data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Fetch failed');
        }
    }
)
