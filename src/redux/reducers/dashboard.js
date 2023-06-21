import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getDashboard = createAsyncThunk("dashboard/getDashboard", async ({day}) => {
  try {
    const res = await greenBookAPI.getDashboard();
    if (res.status === 200) {
      const result = res.data;
      return result.data;
    }
  } catch (error) {
    throw error;
  }
});


export default dashboardSlice;
