import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: null,
    loading: false,
    error: false,
    successUpdate: false,
  },
  reducers: {
    userDetailRequest(state) {
      state.loading = true;
    },
    userDetailSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    userDetailFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailReset(state) {
      state.loading = false;
      state.error = false;
      state.user = null;
    },
    userDetailUpdate(state) {
      state.successUpdate = true;
      state.loading = false;
      state.error = false;
    },
    userDetailUpdateReset(state) {
      state.successUpdate = false;
    },
  },
});

export const userDetailAction = userDetailSlice.actions;

export default userDetailSlice.reducer;
