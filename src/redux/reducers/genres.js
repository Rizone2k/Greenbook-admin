import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const genresSlice = createSlice({
  name: "genres",
  initialState: { status: "idle", data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getGenres = createAsyncThunk(
  "books/getGenres",
  async ({ limit = "20", page = "1" }) => {
    try {
      const res = await greenBookAPI.getGenres(limit, page);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
export const createGenre = createAsyncThunk(
  "books/createGenre",
  async ({ name = "", description = "" }) => {
    try {
      const res = await greenBookAPI.createGenre(name, description);
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

export const updateGenre = createAsyncThunk(
  "books/updateGenre",
  async ({ id = "", name = "", description = "" }) => {
    try {
      const res = await greenBookAPI.updateGenre(id, name, description);
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

export const deleteGenre = createAsyncThunk(
  "books/deleteGenre",
  async ({ id }) => {
    try {
      const res = await greenBookAPI.deleteGenre(id);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export default genresSlice;
