import { BillData } from "@/types/statType";
import { createSlice } from "@reduxjs/toolkit";
import { getAddBill, getAllBills, getBillById, getDeleteBill, updateBillById } from "./billThunk";

const initialState: BillData = {
  bills: [],
  totalBills: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  bill: null,
  error: null,
  success: false,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    resetBillState: (state) => {
      state.success = false;
      state.error = null;
      state.bills = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBills.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills = action.payload.data.bills;
        state.totalBills = action.payload.totalBills;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(getAllBills.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAddBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAddBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills.push(action.payload.data);
        state.error = null;
        state.success = true;
      })
      .addCase(getAddBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
    builder
      .addCase(getDeleteBill.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDeleteBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bills = state.bills.filter((bill) => bill._id !== action.payload._id);
        state.error = null;
        state.success = true;
      })
      .addCase(getDeleteBill.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getBillById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBillById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bill = action.payload.bill;
        state.success = true;
        state.error = null;
      })
      .addCase(getBillById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      
    builder
      .addCase(updateBillById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBillById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bill = action.payload.bill;
        state.success = true;
        state.error = null;
      })
      .addCase(updateBillById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });

  },
});
export const {resetBillState} = billSlice.actions
export default billSlice.reducer;

