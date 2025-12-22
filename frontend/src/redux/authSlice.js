import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let userdata = null;
const usertoken = localStorage.getItem("token");


try {
  if (usertoken) userdata = jwtDecode(usertoken);
} catch (err) {
  console.error("Invalid token found. Clearing...");
  localStorage.removeItem("token");
  userdata = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userdata,
    token: usertoken || null,
    islogin: !!userdata,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.islogin = true;

      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.islogin = false;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

