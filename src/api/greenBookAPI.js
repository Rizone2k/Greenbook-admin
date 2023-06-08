import instance from "./axios.config";
import queryString from "query-string";
import PropTypes from "prop-types";
import FormData from "form-data";

const greenBookAPI = {
  // ~~~~~~~~~~~~~~Book~~~~~~~~~~~~~~~~//
  getBook: (id, name) => {
    const query = {
      ...(id && { bookId: id }),
      ...(name && { bookName: name }),
    };
    const url = `books/find?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  getBooks: (limit = "10", page = "1") => {
    const query = {
      ...(limit && { rowPerPage: limit }),
      ...(page && page !== "0" && { pageNumber: page }),
    };
    const url = `books/?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  updateBook: (
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
    authorIds
  ) => {
    const query = {
      ...(id && { bookId: id }),
    };
    const url = `book_admin/?${queryString.stringify({
      ...query,
    })}`;
    const requestData = {
      name,
      price,
      isbn,
      weight,
      description,
      age_limit,
      cover_type,
      hand_cover,
      rate,
      total_rating,
      available_quantity,
      sold_quantity,
      authorIds,
      genreIds,
    };
    return instance.put(url, JSON.stringify(requestData));
  },

  createBook: (
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
    authorIds
  ) => {
    const url = `book_admin/`;
    const requestData = {
      name,
      price,
      isbn,
      weight,
      description,
      age_limit,
      cover_type,
      hand_cover,
      rate,
      total_rating,
      available_quantity,
      sold_quantity,
      genreIds,
      authorIds,
    };
    return instance.post(url, JSON.stringify(requestData));
  },

  updateBookImage: (id, image) => {
    const query = {
      ...(id && { bookId: id }),
    };
    const url = `book_admin/upload_image?${queryString.stringify({
      ...query,
    })}`;
    console.log(url);
    console.log(image);
    return instance.post(url, JSON.stringify(image));
  },

  deleteBook: (id) => {
    const query = {
      ...(id && { bookId: id }),
    };
    const url = `book_admin/?${queryString.stringify({
      ...query,
    })}`;
    return instance.delete(url);
  },
  searchBook: (search) => {
    const query = {
      ...{ rowPerPage: "20" },
      ...{ pageNumber: "1" },
    };
    const url = `books/search?keyword=${search}&${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  // ~~~~~~~~~~~~~~Author~~~~~~~~~~~~~~~~//
  getAuthor: (id, name) => {
    const query = {
      ...(id && { authorId: id }),
      ...(name && { authorName: name }),
    };
    const url = `authors/find?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  getAuthors: (limit = "10", page = "1") => {
    const query = {
      ...(limit && { rowPerPage: limit }),
      ...(page && page !== "0" && { pageNumber: page }),
    };
    const url = `authors/?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  updateAuthor: (id, name, image) => {
    const query = {
      ...(id && { authorId: id }),
    };
    const url = `author_admin/?${queryString.stringify({
      ...query,
    })}`;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    return instance.put(url, JSON.stringify(formData));
  },

  createAuthor: (name, image) => {
    const url = `author_admin/`;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    console.log(JSON.stringify(formData));
    return instance.post(url, JSON.stringify(formData));
  },

  deleteAuthor: (id) => {
    const query = {
      ...(id && { authorId: id }),
    };
    const url = `author_admin/?${queryString.stringify({
      ...query,
    })}`;
    return instance.delete(url);
  },

  // ~~~~~~~~~~~~~~Genre~~~~~~~~~~~~~~~~//
  getGenre: (id, name, limit = "10", page = "1") => {
    const query = {
      ...(id && { genreId: id }),
      ...(name && { genreName: name }),
      ...{ rowPerPage: limit },
      ...{ pageNumber: page },
    };
    const url = `genres/find?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  getGenres: (limit = "10", page = "1") => {
    const query = {
      ...(limit && { rowPerPage: limit }),
      ...(page && page !== "0" && { pageNumber: page }),
    };
    const url = `genres/?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  updateGenre: (id, name, description) => {
    const query = {
      ...(id && { genreId: id }),
    };
    const url = `genre_admin/?${queryString.stringify({
      ...query,
    })}`;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    console.log(JSON.stringify(formData));
    return instance.put(url, JSON.stringify(formData));
  },

  createGenre: (name, description) => {
    const url = `genre_admin/`;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    console.log(JSON.stringify(formData));
    return instance.post(url, JSON.stringify(formData));
  },

  deleteGenre: (id) => {
    const query = {
      ...(id && { genreId: id }),
    };
    const url = `genre_admin/?${queryString.stringify({
      ...query,
    })}`;
    return instance.delete(url);
  },

  // ~~~~~~~~~~~~~~Publisher~~~~~~~~~~~~~~~~//
  getPublishers: () => {
    const url = `publisher/`;
    return instance.get(url);
  },

  getBooksOfPublisher: (id, limit = "10", page = "1") => {
    const query = {
      ...(id && { publisherId: id }),
      ...(limit && { rowPerPage: limit }),
      ...(page && page !== "0" && { pageNumber: page }),
    };
    const url = `publisher/find?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  // ~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~//
  getUsers: (limit = "10", page = "1") => {
    const query = {
      ...(limit && { rowPerPage: limit }),
      ...(page && page !== "0" && { pageNumber: page }),
    };
    const url = `user_admin?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },

  updateRole: (id, listRole) => {
    const query = {
      ...(id && { userId: id }),
    };
    const url = `user_admin/update_role?${queryString.stringify({
      ...query,
    })}`;
    var formData = new FormData();
    const rolesArray = listRole.map((role) => role);
    formData.append(JSON.stringify(rolesArray));
    console.log(JSON.stringify(formData));
    return instance.post(url, JSON.stringify(formData));
  },

  resetPassword: (email) => {
    const query = {
      ...(email && { userEmail: email }),
    };
    const url = `user_admin/reset_password?${queryString.stringify({
      ...query,
    })}`;
    return instance.post(url);
  },

  deleteUser: (id) => {
    const query = {
      ...(id && { userId: id }),
    };
    const url = `user_admin?${queryString.stringify({
      ...query,
    })}`;
    return instance.delete(url);
  },

  // ~~~~~~~~~~~~~~Order~~~~~~~~~~~~~~~~//
  getOrders: () => {
    const url = `/order_admin`;
    return instance.get(url);
  },

  updateStatusOrder: (id) => {
    const query = {
      ...(id && { genreId: id }),
    };
    const url = `/order_adminstatus?${queryString.stringify({
      ...query,
    })}`;
    return instance.post(url);
  },

  // ~~~~~~~~~~~~~~Shipping~~~~~~~~~~~~~~~~//
  getShippingFees: () => {
    const url = `/shipping_admin/`;
    return instance.get(url);
  },

  createShippingFee: (fromWeight = "0", toWeight, price = "0") => {
    const query = {
      ...(fromWeight && { from_weight: fromWeight }),
      ...(toWeight && { to_weight: toWeight }),
      ...(price && { price: price }),
    };
    const url = `/shipping_admin/create?${queryString.stringify({
      ...query,
    })}`;
    return instance.post(url);
  },

  updateShippingFee: (id, fromWeight = "0", toWeight, price = "0") => {
    const query = {
      ...(id && { shippingId: id }),
    };
    const url = `/shipping_admin/update?${queryString.stringify({
      ...query,
    })}`;
    var formData = new FormData();
    formData.append("from_weight", fromWeight);
    formData.append("to_weight", toWeight);
    formData.append("price", price);
    console.log(JSON.stringify(formData));
    return instance.put(url, JSON.stringify(formData));
  },
  // ~~~~~~~~~~~~~~Discount~~~~~~~~~~~~~~~~//
  getCoupons: () => {
    const url = `/discount_admin`;
    return instance.get(url);
  },

  createCoupon: (
    coupon,
    amount,
    minPrice = "0",
    limitPrice,
    isPercent = "false",
    expiredAt
  ) => {
    const query = {
      ...(coupon && { coupon: coupon }),
      ...(amount && { amount: amount }),
      ...(minPrice && { min_price: minPrice }),
      ...(limitPrice && { limit_price: limitPrice }),
      ...(isPercent && { is_percent: isPercent }),
      ...(expiredAt && { expired_at: expiredAt }),
    };
    const url = `/shipping_admin/create?${queryString.stringify({
      ...query,
    })}`;
    return instance.post(url);
  },

  updateCoupon: (
    id,
    coupon,
    amount,
    minPrice = "0",
    limitPrice,
    isPercent = "false",
    expiredAt
  ) => {
    const query = {
      ...(id && { couponId: id }),
    };
    const url = `/shipping_admin/create?${queryString.stringify({
      ...query,
    })}`;
    var formData = new FormData();
    formData.append("coupon", coupon);
    formData.append("amount", amount);
    formData.append("min_price", minPrice);
    formData.append("limit_price", limitPrice);
    formData.append("is_percent", isPercent);
    formData.append("expired_at", expiredAt);
    console.log(JSON.stringify(formData));
    return instance.put(url, JSON.stringify(formData));
  },
};

greenBookAPI.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default greenBookAPI;
