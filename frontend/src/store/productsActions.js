import { productListActions } from "./productListSlice";
import { productActions } from "./productSlice";
import { productCreateActions } from "./productCreateSlice";
import { productEditActions } from "./productEditSlice";
import { productReviewActions } from "./productReviewSlice";
import { productTopReatedActions } from "./productTopReated";
import axios from "axios";

export const fetchdata =
  (keyword = "", page) =>
  async (dispatch) => {
    console.log(page);
    try {
      dispatch(productListActions.productListRequest());
      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&page=${page}`
      );

      dispatch(productListActions.productListSuccess(data));
    } catch (err) {
      dispatch(
        productListActions.productListFail(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const fetchSpecificdata = (id) => async (dispatch) => {
  try {
    dispatch(productActions.productListRequest());
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch(productActions.productListSuccess(data));
  } catch (err) {
    dispatch(
      productActions.productListFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productListActions.productListRequest());
    await axios({
      method: "DELETE",
      url: `/api/v1/products/${id}`,
    });

    dispatch(productListActions.productListDelete());
  } catch (err) {
    dispatch(
      productListActions.productListFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch(productCreateActions.productCreateRequest());
    await axios({
      method: "POST",
      url: `/api/v1/products`,
      data,
    });

    dispatch(productCreateActions.productCreateSuccess());
  } catch (err) {
    dispatch(
      productCreateActions.productCreateFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const productEdit = (data, id) => async (dispatch) => {
  try {
    dispatch(productEditActions.productEditRequest());
    await axios({
      method: "PATCH",
      url: `/api/v1/products/${id}`,
      data: data,
    });

    dispatch(productEditActions.productEditSuccess());
  } catch (err) {
    dispatch(
      productEditActions.productEditFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const createProductReview = (data, id) => async (dispatch) => {
  try {
    dispatch(productReviewActions.productReviewRequest());
    await axios({
      method: "POST",
      url: `/api/v1/products/${id}/reviews`,
      data,
    });

    dispatch(productReviewActions.productReviewSuccess());
  } catch (err) {
    dispatch(
      productReviewActions.productReviewFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productTopReatedActions.productTopReatedRequest());
    const { data } = await axios.get(`/api/v1/products/toprated`);

    dispatch(productTopReatedActions.productTopReatedSuccess(data));
  } catch (err) {
    dispatch(
      productTopReatedActions.productTopReatedFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
