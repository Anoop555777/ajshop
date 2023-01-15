import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
  name: "productList",
  initialState: {
    products: [],
    loading: false,
    error: false,
    successDelete: false,
    pages: 0,
  },
  reducers: {
    productListRequest(state) {
      state.loading = true;
    },
    productListSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.error = false;
    },
    productListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productListDelete(state) {
      state.successDelete = !state.successDelete;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
