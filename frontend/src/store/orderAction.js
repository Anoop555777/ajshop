import { orderAction } from "./orderSlice";
import axios from "axios";
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(orderAction.orderRequest());
    const { data } = await axios({
      method: "POST",
      url: "/api/v1/orders",
      data: orderData,
    });

    dispatch(orderAction.orderSuccess(data.data));
  } catch (err) {
    dispatch(
      orderAction.orderFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch(orderAction.orderRequest());
    const { data } = await axios({
      method: "GET",
      url: `/api/v1/orders/${id}`,
    });

    dispatch(orderAction.orderSuccess(data.data));
  } catch (err) {
    dispatch(
      orderAction.orderFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
