import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const publishersSlice = createSlice({
  name: "publishers",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublishers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPublishers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getPublishers.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getPublishers = createAsyncThunk(
  "books/getPublishers",
  async () => {
    try {
      const res = await greenBookAPI.getPublishers();
      console.log(res);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export default publishersSlice;
