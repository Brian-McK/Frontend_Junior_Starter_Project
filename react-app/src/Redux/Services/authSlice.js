import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", token: "" },
  reducers: {
    setCredentials: (state, action) => {
      const username = action.payload.username;
      const jwtToken = action.payload.jwtToken;
      state.user = username;
      state.token = jwtToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
