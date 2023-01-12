import { createSlice } from "@reduxjs/toolkit";
const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: {
    deliverSuccess: false,
    loading: false,
    error: false,
  },
  reducers: {
    orderDeliverRequest(state) {
      state.loading = true;
    },
    orderDeliverSuccess(state) {
      state.loading = false;
      state.deliverSuccess = true;
    },
    orderDeliverFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDeliverReset(state, action) {
      state.loading = false;
      state.error = false;
      state.deliverSuccess = false;
    },
  },
});
export const orderDeliverAction = orderDeliverSlice.actions;

export default orderDeliverSlice.reducer;
