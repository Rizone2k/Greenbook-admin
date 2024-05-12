import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.js";
import booksSlice from "./reducers/books.js";
import authorsSlice from "./reducers/authors.js";
import genresSlice from "./reducers/genres.js";
import couponsSlice from "./reducers/coupons.js";
import ordersSlice from "./reducers/orders.js";
import usersSlice from "./reducers/users.js";
import publishersSlice from "./reducers/publisher.js";
import shippingsSlice from "./reducers/shippings.js";
import dashboardSlice from "./reducers/dashboard.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: booksSlice.reducer,
    authors: authorsSlice.reducer,
    genres: genresSlice.reducer,
    coupons: couponsSlice.reducer,
    orders: ordersSlice.reducer,
    users: usersSlice.reducer,
    publishers: publishersSlice.reducer,
    shippings: shippingsSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});

export default store;
