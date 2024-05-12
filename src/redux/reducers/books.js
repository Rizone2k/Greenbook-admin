import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import greenBookAPI from "@/api/greenBookAPI";
const booksSlice = createSlice({
  name: "books",
  initialState: { status: "idle", data: [], bookIdJustCreated: "" },
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
      })
      .addCase(getBooksOfPublisher.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.bookIdJustCreated = action.payload.id;
        state.status = "idle";
      })
      .addCase(updateBookImage.fulfilled, (state, action) => {
        state.bookIdJustCreated = "";
        state.status = "idle";
      })
      .addCase(updateBookImage.rejected, (state, action) => {
        state.bookIdJustCreated = "";
        state.status = "idle";
      })
      .addCase(searchBook.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      });
  },
});

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ limit = "20", page = "1" }) => {
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

export const getBooksOfPublisher = createAsyncThunk(
  "books/getBooksOfPublisher",
  async ({ id }) => {
    try {
      const res = await greenBookAPI.getBooksOfPublisher(id);
      if (res.status === 200) {
        const result = res.data;
        return result.data.books;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async ({
    name,
    isbn,
    weight,
    age_limit = "0",
    hand_cover = "0",
    cover_type,
    description,
    rate = "0",
    total_rating = "0",
    available_quantity = "0",
    sold_quantity = "0",
    price = "0",
    genreIds,
    authorIds,
  }) => {
    try {
      const res = await greenBookAPI.createBook(
        name,
        isbn,
        weight,
        age_limit,
        hand_cover,
        cover_type,
        description,
        rate,
        total_rating,
        available_quantity,
        sold_quantity,
        price,
        genreIds,
        authorIds
      );

      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateBookImage = createAsyncThunk(
  "books/updateBookImage",
  async ({ id, image }) => {
    console.log(id, image);
    try {
      const res = await greenBookAPI.updateBookImage(id, image);
      if (res.status === 200) {
        const result = res.data;
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({
    id,
    name,
    isbn,
    weight,
    age_limit = "0",
    hand_cover = "0",
    cover_type,
    description,
    rate = "0",
    total_rating = "0",
    available_quantity = "0",
    sold_quantity = "0",
    price = "0",
    genreIds,
    authorIds,
  }) => {
    try {
      const res = await greenBookAPI.updateBook(
        id,
        name,
        isbn,
        weight,
        age_limit,
        hand_cover,
        cover_type,
        description,
        rate,
        total_rating,
        available_quantity,
        sold_quantity,
        price,
        genreIds,
        authorIds
      );
      if (res.status === 200) {
        const result = res.data;
        return result.data.books;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  console.log("id", id);
  try {
    const res = await greenBookAPI.deleteBook(id);
    if (res.status === 200) {
      const result = res.data;
      return result.message;
    }
  } catch (error) {
    throw error;
  }
});

export const searchBook = createAsyncThunk(
  "books/searchBook",
  async (search) => {
    try {
      const res = await greenBookAPI.searchBook(search);
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
