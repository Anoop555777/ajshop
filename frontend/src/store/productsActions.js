import { productListActions } from "./productListSlice";
import { productActions } from "./productSlice";
import axios from "axios";

export const fetchdata = () => async (dispatch) => {
  try {
    dispatch(productListActions.productListRequest());
    const { data } = await axios.get("/api/v1/products");

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
