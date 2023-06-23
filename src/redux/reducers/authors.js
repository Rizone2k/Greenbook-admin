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

export const createAuthor = createAsyncThunk(
  "books/createAuthor",
  async ({ name = "", image = "" }) => {
    try {
      const res = await greenBookAPI.createAuthor(name, image);
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

export const updateAuthor = createAsyncThunk(
  "books/updateAuthor",
  async ({ id = "", name = "", image = "" }) => {
    try {
      const res = await greenBookAPI.updateAuthor(id, name, image);
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

export const deleteAuthor = createAsyncThunk(
  "books/deleteAuthor",
  async ({ id }) => {
    try {
      const res = await greenBookAPI.deleteAuthor(id, name);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export default authorsSlice;
