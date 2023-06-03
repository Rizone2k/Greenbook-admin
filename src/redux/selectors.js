export const currentUserSelector = (state) => state.auth.currentUser;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;

export const booksSelector = (state) => state.books.data;
export const authorsSelector = (state) => state.authors.data;
export const genresSelector = (state) => state.genres.data;
export const couponsSelector = (state) => state.coupons.data;
export const ordersSelector = (state) => state.orders.data;
export const publisherSelector = (state) => state?.publisher?.data ?? "";
export const usersSelector = (state) => state.users.data;
