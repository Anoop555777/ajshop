import { createSlice } from "@reduxjs/toolkit";
const orderList = createSlice({
  name: "orderPay",
  initialState: {
    state: { orders: [], loading: false, error: false },
  },
  reducers: {
    orderRequest(state) {
      state.state.loading = true;
    },
    orderSuccess(state, action) {
      state.state.loading = false;
      state.state.orders = action.payload.order;
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
export const orderListAction = orderList.actions;

export default orderList.reducer;
