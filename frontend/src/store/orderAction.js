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
    console.log(data.data);

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
