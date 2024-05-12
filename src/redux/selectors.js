export const currentUserSelector = (state) => state?.auth?.currentUser ?? "";
export const isLoggedInSelector = (state) => state?.auth?.isLoggedIn ?? "";

export const bookIdJustCreatedSelector = (state) =>
  state?.books?.bookIdJustCreated ?? "";

export const booksSelector = (state) => state?.books?.data ?? "";
export const authorsSelector = (state) => state?.authors?.data ?? "";
export const genresSelector = (state) => state?.genres?.data ?? "";
export const couponsSelector = (state) => state?.coupons?.data ?? "";
export const ordersSelector = (state) => state?.orders?.data ?? "";
export const publisherSelector = (state) => state?.publishers?.data ?? "";
export const usersSelector = (state) => state?.users?.data ?? "";
export const shippingsSelector = (state) => state?.shippings?.data ?? "";
export const dashboardSelector = (state) => state?.dashboard?.data ?? "";
