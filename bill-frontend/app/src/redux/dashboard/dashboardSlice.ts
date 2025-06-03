import { createSlice } from "@reduxjs/toolkit"
import { getBillStats, getChallanStats, getCountChartData, getGrowthRate, getNewBills, getPerfomanceChartData, getRecenetBills } from "./dashboardThunk"
import { DashboardStatData } from "@/types/statType"


const initialState: DashboardStatData = {
    billStates: null,
    challanStates: null,
    newBillsState: null,
    billGrowthRate: null,
    perfomanceChartData: [],
    countChartData: [],
    recentBillsData: [],
    isLoading: false,
    error: null as string | null,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBillStats.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBillStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.billStates = action.payload.data;
                state.error = null;
            })
            .addCase(getBillStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

        builder
            .addCase(getChallanStats.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getChallanStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.challanStates = action.payload.data;
                state.error = null;
            })
            .addCase(getChallanStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

        builder
            .addCase(getNewBills.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getNewBills.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newBillsState = action.payload.data;
                state.error = null;
            })
            .addCase(getNewBills.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

        builder
            .addCase(getGrowthRate.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getGrowthRate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.billGrowthRate = action.payload.data;
                state.error = null;
            })
            .addCase(getGrowthRate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

        builder
            .addCase(getPerfomanceChartData.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPerfomanceChartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.perfomanceChartData = action.payload.data;
                state.error = null;
            })
            .addCase(getPerfomanceChartData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

        builder
            .addCase(getCountChartData.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCountChartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.countChartData = action.payload.data;
                state.error = null;
            })
            .addCase(getCountChartData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
        
        builder
            .addCase(getRecenetBills.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRecenetBills.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recentBillsData = action.payload.data;
                state.error = null;
            })
            .addCase(getRecenetBills.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })


    }
})

export default dashboardSlice.reducer;