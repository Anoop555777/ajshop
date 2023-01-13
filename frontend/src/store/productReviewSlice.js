import { createSlice } from "@reduxjs/toolkit";

const productReviewSlice = createSlice({
  name: "productReviewSlice",
  initialState: { successProductReview: false, loading: false, error: false },
  reducers: {
    productReviewRequest(state) {
      state.loading = true;
    },
    productReviewSuccess(state) {
      state.loading = false;
      state.successProductReview = true;
    },
    productReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productReviewReset(state) {
      state.loading = false;
      state.successProductReview = false;
      state.error = false;
    },
  },
});

export const productReviewActions = productReviewSlice.actions;

export default productReviewSlice.reducer;
