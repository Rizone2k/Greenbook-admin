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

export const createCoupon = createAsyncThunk(
  "books/createCoupon",
  async ({
    coupon,
    amount,
    minPrice = "0",
    limitPrice,
    isPercent = "true",
    expiredAt,
  }) => {
    try {
      const res = await greenBookAPI.createCoupon(
        coupon,
        amount,
        minPrice,
        limitPrice,
        isPercent,
        expiredAt
      );
      console.log(res.data);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
export const updateCoupon = createAsyncThunk(
  "books/updateCoupon",
  async ({
    id,
    coupon,
    amount,
    minPrice = "0",
    limitPrice,
    isPercent = "true",
    expiredAt,
  }) => {
    try {
      const res = await greenBookAPI.updateCoupon(
        id,
        coupon,
        amount,
        minPrice,
        limitPrice,
        isPercent,
        expiredAt
      );
      console.log(res.data);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export default couponsSlice;
