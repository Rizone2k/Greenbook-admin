import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const authorsSlice = createSlice({
  name: "authors",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthors.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.status = "error";
      });
    // .addCase(getAuthor.fulfilled, (state, action) => {
    //   state.data = action.payload;
    //   state.status = "idle";
    // });
  },
});

export const getAuthors = createAsyncThunk(
  "books/getAuthors",
  async ({ limit = "20", page = "1" }) => {
    try {
      const res = await greenBookAPI.getAuthors(limit, page);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
// export const getAuthor = createAsyncThunk(
//   "books/getAuthor",
//   async ({ id, name }) => {
//     try {
//       const res = await greenBookAPI.getAuthor(id, name);
//       if (res.status === 200) {
//         const result = res.data;
//         return result.data;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export default authorsSlice;
