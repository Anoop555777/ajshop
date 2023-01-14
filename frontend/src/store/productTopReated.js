import { createSlice } from "@reduxjs/toolkit";

const productTopReated = createSlice({
  name: "productTopReated",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {
    productTopReatedRequest(state) {
      state.loading = true;
    },
    productTopReatedSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    productTopReatedFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productTopReatedActions = productTopReated.actions;

export default productTopReated.reducer;
