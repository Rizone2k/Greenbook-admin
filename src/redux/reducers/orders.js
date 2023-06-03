import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const ordersSlice = createSlice({
  name: "orders",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getOrders = createAsyncThunk("books/getCoupon", async () => {
  try {
    const res = await greenBookAPI.getOrders();
    if (res.status === 200) {
      const result = res.data;
      return result.data;
    }
  } catch (error) {
    throw error;
  }
});

export default ordersSlice;
