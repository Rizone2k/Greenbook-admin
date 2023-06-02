import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.js";
import booksSlice from "./reducers/books.js";
import authorsSlice from "./reducers/authors.js";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: booksSlice.reducer,
    authors: authorsSlice.reducer,
  },
});

export default store;