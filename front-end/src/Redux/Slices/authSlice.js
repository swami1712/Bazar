import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("token", JSON.stringify(state.userInfo));
    },
    logoutUser: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
