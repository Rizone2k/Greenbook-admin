import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const couponsSlice = createSlice({
  name: "coupons",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getCoupons = createAsyncThunk("books/getCoupon", async () => {
  try {
    const res = await greenBookAPI.getCoupons();
    if (res.status === 200) {
      const result = res.data;
      return result.data;
    }
  } catch (error) {
    throw error;
  }
});

export default couponsSlice;
