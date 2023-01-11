import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { product: {}, loading: false, error: false },
  reducers: {
    productListRequest(state) {
      state.loading = true;
    },
    productListSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    productListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
