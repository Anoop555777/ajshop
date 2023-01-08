import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: null, email: null, role: null },
    success: false,
    loading: false,
    error: false,
  },
  reducers: {
    userRegisterRequest(state) {
      state.loading = true;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.role = action.payload.user.role;
      state.error = null;
    },
    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLoginRequest(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.role = action.payload.user.role;
      state.error = null;
    },
    userLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogoutRequest(state, action) {
      state.loading = true;
    },
    userLogoutSuccess(state, action) {
      state.loading = false;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.role = action.payload.user.role;
      state.error = null;
    },
    isLoggedIn(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.role = action.payload.user.role;
    },

    updateMeRequest(state) {
      state.loading = true;
    },
    updateMeFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateMeSuccess(state, action) {
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.error = null;
      state.success = true;
      state.loading = false;
    },
    userReset(state) {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.user.name = null;
      state.user.email = null;
      state.user.role = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
