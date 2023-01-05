import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orderList",
  initialState: { order: {}, loading: false, error: false, success: false },
  reducers: {
    orderRequest(state) {
      state.loading = true;
    },
    orderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload.order;
      state.success = true;
    },
    orderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderReset(state) {
      state.order = {};
      state.success = false;
      state.loading = false;
      state.error = false;
    },
  },
});

export const orderAction = orderSlice.actions;

export default orderSlice.reducer;
