import instance from "./axios.config";
import queryString from "query-string";
import PropTypes from "prop-types";

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

  // ~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~//
  changPassword: (oldPassword = "", newPassword = "") => {
    const query = {
      ...(oldPassword && { oldPassword }),
      ...(newPassword && { newPassword }),
    };
    const url = `users/change_password?${queryString.stringify({
      ...query,
    })}`;
    return instance.post(url);
  },
};

greenBookAPI.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default greenBookAPI;
