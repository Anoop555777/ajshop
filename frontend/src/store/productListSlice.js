import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productList",
  initialState: { products: [], loading: false, error: false },
  reducers: {
    productListRequest(state) {
      state.loading = true;
      state.products = [];
    },
    productListSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    productListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
