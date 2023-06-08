import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import instance from "@/api/axios.config";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: Cookies.get("LOGGED") === "true",
    currentUser: Cookies.get("INFO") ? JSON.parse(Cookies.get("INFO")) : [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.isLoggedIn = true;
          state.currentUser = action.payload?.user ?? action.payload;
          Cookies.set("LOGGED", JSON.stringify(state.isLoggedIn));
          Cookies.set("INFO", JSON.stringify(state.currentUser));
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = {};
        Cookies.remove("LOGGED");
        Cookies.remove("INFO");
        Cookies.remove("access_token");
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser));
      });
    // .addCase(updateUser.fulfilled, (state, action) => {
    //   state.currentUser = action.payload;
    //   Cookies.set("INFO", JSON.stringify(state.currentUser));
    // });
  },
});

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    function checkRoles(allowRoles, roles) {
      for (let role of roles) {
        if (allowRoles.includes(role)) {
          return true;
        }
      }
      return false;
    }
    try {
      const res = await instance.post(
        `/auth/login`,
        JSON.stringify({ email, password })
      );
      if (res.status === 200) {
        if (res.data.message === "Login successfully") {
          Cookies.set("access_token", res?.data?.data?.access_token);
          const allowRoles = ["admin", "superadmin", "publisher"];
          const role = jwt_decode(res?.data?.data?.access_token);
          if (checkRoles(allowRoles, role?.roles)) {
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
              roles: role?.roles,
            };
            return { user };
          } else {
            return "Bạn không được quyền truy cập vào tài nguyên này!";
          }
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

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (
//     {
//       avatar,
//       first_name,
//       last_name,
//       date_of_birth,
//       mobile,
//       default_address,
//       ship_address,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await instance.post(
//         `/users/update`,
//         JSON.stringify({
//           avatar,
//           first_name,
//           last_name,
//           date_of_birth,
//           mobile,
//           ship_address,
//           default_address,
//         })
//       );
//       if (res.status === 200) {
//         if (res.data.data) {
//           const user = {
//             id: res?.data?.data?.id ?? "",
//             id_user: res?.data?.data?.user_idUser ?? "",
//             firstName: res?.data?.data?.first_name ?? "",
//             lastName: res?.data?.data?.last_name ?? "",
//             avatar: res?.data?.data?.avatar ?? "",
//             mobile: res?.data?.data?.mobile ?? "",
//             address: res?.data?.data?.address ?? "",
//             dateOfBirth: res?.data?.data?.date_of_birth ?? "",
//             defaultAddress: res?.data?.data?.default_address ?? "",
//             shipAddress: res?.data?.data?.ship_address ?? "",
//           };
//           return user;
//         } else {
//           throw rejectWithValue(res.data.message);
//         }
//       }
//     } catch (error) {
//       if (error.payload) {
//         throw rejectWithValue(error.payload);
//       } else {
//         throw error;
//       }
//     }
//   }
// );

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

export default authSlice;
