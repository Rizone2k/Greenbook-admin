import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const shippingsSlice = createSlice({
  name: "shippings",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShippings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getShippings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getShippings.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getShippings = createAsyncThunk("books/getShippings", async () => {
  try {
    const res = await greenBookAPI.getShippingFees();
    if (res.status === 200) {
      const result = res.data;
      return result.data;
    }
  } catch (error) {
    throw error;
  }
});

export default shippingsSlice;
