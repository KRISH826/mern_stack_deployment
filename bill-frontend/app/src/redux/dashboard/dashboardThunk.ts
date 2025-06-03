import { createAsyncThunk } from "@reduxjs/toolkit";
import { counterChartApi, getBillStatsApi, getChallanStatsApi, getGrowthRateStatsApi, getNewBillsStatsApi, getRecentBillsApi, perfomanceChartDataApi } from "./dashboardApi";
import { AxiosError } from "axios";

export const getBillStats = createAsyncThunk(
    'stats/getBillStats',
    async (_: void, thunkAPI) => {
        try {
            return await getBillStatsApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Bill Stats Fetch failed');
        }
    }
)

export const getChallanStats = createAsyncThunk(
    'stats/totalchallans',
    async (_: void, thunkAPI) => {
        try {
            return await getChallanStatsApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Challan Stats Fetch failed');
        }
    }
)

export const getNewBills = createAsyncThunk(
    'stats/newbills',
    async (_: void, thunkAPI) => {
        try {
            return await getNewBillsStatsApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'New Bills Stats Fetch failed');
        }
    }
)

export const getGrowthRate = createAsyncThunk(
    'stats/growthrate',
    async (_: void, thunkAPI) => {
        try {
            return await getGrowthRateStatsApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Growth Rate Stats Fetch failed');
        }
    }
)

export const getPerfomanceChartData = createAsyncThunk(
    'stats/billChartData',
    async (timeRange: string, thunkAPI) => {
        try {
            return await perfomanceChartDataApi(timeRange);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Challan Stats Fetch failed');
        }
    }
)

export const getCountChartData = createAsyncThunk(
    'stats/pieChartData',
    async (_: void, thunkAPI) => {
        try {
            return await counterChartApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Pie chart Stats Fetch failed');
        }
    }
)

export const getRecenetBills = createAsyncThunk(
    'stats/recentbills',
    async (_: void, thunkAPI) => {
        try {
            return await getRecentBillsApi();
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            // Handle error response from the API
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Pie chart Stats Fetch failed');
        }
    }
)

