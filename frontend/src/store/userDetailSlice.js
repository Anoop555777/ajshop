import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    userDetailRequest(state) {
      state.loading = true;
    },
    userDetailSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
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
  },
});

export const userDetailAction = userDetailSlice.actions;

export default userDetailSlice.reducer;
