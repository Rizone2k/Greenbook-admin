import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.js";
import booksSlice from "./reducers/books.js";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: booksSlice.reducer,
  },
});

export default store;
