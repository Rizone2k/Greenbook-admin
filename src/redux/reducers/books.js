import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const booksSlice = createSlice({
  name: "books",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ limit = "20", page = "1" }) => {
    console.log({ limit, page });
    try {
      const res = await greenBookAPI.getBooks(limit, page);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export default booksSlice;
