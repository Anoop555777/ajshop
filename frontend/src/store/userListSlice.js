import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    loading: false,
    error: false,
    successDelete: false,
  },
  reducers: {
    userListRequest(state) {
      state.loading = true;
    },
    userListSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    userListFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userListReset(state) {
      state.loading = false;
      state.error = false;
      state.users = [];
    },
    userDelete(state, action) {
      state.successDelete = !state.successDelete;
    },
  },
});

export const userListAction = userListSlice.actions;

export default userListSlice.reducer;
