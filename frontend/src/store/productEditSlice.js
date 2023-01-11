import { createSlice } from "@reduxjs/toolkit";

const productEditSlice = createSlice({
  name: "productEdit",
  initialState: { editSuccess: false, loading: false, error: false },
  reducers: {
    productEditRequest(state) {
      state.loading = true;
    },
    productEditSuccess(state) {
      state.loading = false;
      state.editSuccess = true;
    },
    productEditFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productEditReset(state) {
      state.loading = false;
      state.editSuccess = false;
      state.error = false;
    },
  },
});

export const productEditActions = productEditSlice.actions;

export default productEditSlice.reducer;
