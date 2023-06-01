import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import instance from "@/api/axios.config";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isVerified: Cookies.get("VERIFY") ? Cookies.get("VERIFY") : false,
    isLoggedIn: Cookies.get("LOGGED") === "true",
    currentUser: Cookies.get("INFO") ? JSON.parse(Cookies.get("INFO")) : [],
    cart: Cookies.get("CART") ? JSON.parse(Cookies.get("CART")) : [],
    total: Cookies.get("TOTAL") ? parseInt(Cookies.get("TOTAL")) : 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.isLoggedIn = true;
          state.currentUser = action.payload?.user ?? action.payload;
          state.cart = action.payload?.cart?.cartItems ?? "";
          state.total = action.payload?.cart?.cart?.quantity ?? "";
          state.cart && Cookies.set("CART", JSON.stringify(state.cart));
          Cookies.set("TOTAL", state.total);
          Cookies.set("LOGGED", JSON.stringify(state.isLoggedIn));
          Cookies.set("INFO", JSON.stringify(state.currentUser));
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isVerified = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = {};
        state.cart = [];
        state.total = 0;
        state.isVerified = false;
        Cookies.remove("LOGGED");
        Cookies.remove("CART");
        Cookies.remove("INFO");
        Cookies.remove("access_token");
        Cookies.remove("TOTAL");
        Cookies.remove("VERIFY");
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser));
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser));
      })
      .addCase(addCart.fulfilled, (state, action) => {
        if (action.payload[1] === "Successfully") {
          state.cart = action.payload[0].cartItems;
          state.total = action.payload[0].cart.quantity;
        }
        Cookies.set("CART", JSON.stringify(state.cart));
        Cookies.set("TOTAL", state.total);
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (action.payload[1] === "Successfully") {
          state.cart = action.payload[0].cartItems;
          state.total = action.payload[0].cart.quantity;
        }
        Cookies.set("CART", JSON.stringify(state.cart));
        Cookies.set("TOTAL", state.total);
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = [];
        state.total = [];
        Cookies.remove("CART");
        Cookies.remove("TOTAL");
      })
      .addCase(clear.fulfilled, (state, action) => {
        state.cart = [];
        Cookies.remove("CART");
        Cookies.remove("TOTAL");
        state.total = 0;
      });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(
        `/users/login`,
        JSON.stringify({ email, password })
      );
      if (res.status === 200) {
        if (res.data.message === "Login successfully") {
          Cookies.set("access_token", res.data.data.access_token);
          const resUser = await instance.get(`/users/find`);
          const user = {
            id: resUser?.data?.data?.id ?? "",
            id_user: resUser?.data?.data?.user_idUser ?? "",
            firstName: resUser?.data?.data?.first_name ?? "",
            lastName: resUser?.data?.data?.last_name ?? "",
            avatar: resUser?.data?.data?.avatar ?? "",
            mobile: resUser?.data?.data?.mobile ?? "",
            address: resUser?.data?.data?.address ?? "",
            dateOfBirth: resUser?.data?.data?.date_of_birth ?? "",
            defaultAddress: resUser?.data?.data?.default_address ?? "",
            shipAddress: resUser?.data?.data?.ship_address ?? "",
          };
          const cart = await instance.get(`/cart`);
          return { user, cart: cart?.data?.data };
        } else {
          return res.data.message;
        }
      } else {
        throw rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    {
      avatar,
      first_name,
      last_name,
      date_of_birth,
      mobile,
      default_address,
      ship_address,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await instance.post(
        `/users/update`,
        JSON.stringify({
          avatar,
          first_name,
          last_name,
          date_of_birth,
          mobile,
          ship_address,
          default_address,
        })
      );
      if (res.status === 200) {
        if (res.data.data) {
          const user = {
            id: res?.data?.data?.id ?? "",
            id_user: res?.data?.data?.user_idUser ?? "",
            firstName: res?.data?.data?.first_name ?? "",
            lastName: res?.data?.data?.last_name ?? "",
            avatar: res?.data?.data?.avatar ?? "",
            mobile: res?.data?.data?.mobile ?? "",
            address: res?.data?.data?.address ?? "",
            dateOfBirth: res?.data?.data?.date_of_birth ?? "",
            defaultAddress: res?.data?.data?.default_address ?? "",
            shipAddress: res?.data?.data?.ship_address ?? "",
          };
          return user;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Log_Out");
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const id = Cookies.get("uid");
      const res = await instance.post(`/user/refresh`, { id });
      if (res.status === 200) {
        if (res.data.status === "success") {
          Cookies.set("access_token", res.data.data.access_token);
          return res.data.data.user;
        } else {
          Cookies.remove("access_token");
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      avatar,
      first_name,
      last_name,
      date_of_birth,
      mobile,
      default_address,
      ship_address,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await instance.post(
        `/users/sign-up`,
        JSON.stringify({
          email,
          password,
          avatar,
          first_name,
          last_name,
          date_of_birth,
          mobile,
          ship_address,
          default_address,
        })
      );
      if (res.status === 200) {
        if (res.data.message === "Success") {
          // if (res.data.data.is_verified == false) {
          if (res.data.data) {
            return res.data.data;
          }
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const verify = createAsyncThunk(
  "user/verify",
  async (code, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/users/verify?code=${code}`);
      if (res.status === 200) {
        if (res.data?.message == "User is verified") {
          return "true";
        } else {
          return res.data.message;
        }
      } else {
        throw rejectWithValue(res.data.message);
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const addCart = createAsyncThunk(
  "cart/add",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const res = await instance.post(
        `/cart/add?bookId=${bookId}&quantity=${quantity}`
      );
      if (res.status === 200) {
        if (res.data.data) {
          // if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/cart/update`, [
        {
          cartItemId,
          quantity,
        },
      ]);
      if (res.status === 200) {
        if (res.data.data) {
          // if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.delete(`/cart`);
      if (res.status === 200) {
        if (res.data.data) {
          // if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const clear = createAsyncThunk(
  "auth/clear",
  async (_, { rejectWithValue }) => {
    return null;
  }
);

export default authSlice;
