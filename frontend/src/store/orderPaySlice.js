import { createSlice } from "@reduxjs/toolkit";
const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: { state: { loading: false, error: false, success: false } },
  reducers: {
    orderRequest(state) {
      state.state.loading = true;
    },
    orderSuccess(state, action) {
      state.state.loading = false;
      state.state.success = true;
    },
    orderFail(state, action) {
      state.state.loading = false;
      state.state.error = action.payload;
    },
    orderReset(state, action) {
      state.state = {};
    },
  },
});
export const orderPayAction = orderPaySlice.actions;

export default orderPaySlice.reducer;
