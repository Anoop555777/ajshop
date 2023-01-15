import { createSlice } from "@reduxjs/toolkit";

const UserForgetSlice = createSlice({
  name: "UserForget",
  initialState: { success: false, loading: false, error: false },
  reducers: {
    UserForgetRequest(state) {
      state.loading = true;
    },
    UserForgetSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    UserForgetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    UserForgetReset(state) {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
});

export const UserForgetAction = UserForgetSlice.actions;

export default UserForgetSlice.reducer;
