import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: null, email: null },
    loading: false,
    error: false,
  },
  reducers: {
    userLoginRequest(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
    userLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogoutRequest(state, action) {
      state.loading = true;
    },
    userLogoutSuccess(state, action) {
      state.loading = false;
      state.user = { name: null, email: null };
    },
    isLoggedIn(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
