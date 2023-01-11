import { createSlice } from "@reduxjs/toolkit";

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: { createSuccess: false, loading: false, error: false },
  reducers: {
    productCreateRequest(state) {
      state.loading = true;
    },
    productCreateSuccess(state) {
      state.loading = false;
      state.createSuccess = true;
    },
    productCreateFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productCreateReset(state) {
      state.loading = false;
      state.createSuccess = false;
      state.error = false;
    },
  },
});

export const productCreateActions = productCreateSlice.actions;

export default productCreateSlice.reducer;
