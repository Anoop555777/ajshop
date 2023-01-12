import { orderListAction } from "./orderListSlice";
import axios from "axios";
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch(orderListAction.orderRequest());
    const { data } = await axios.get("/api/v1/orders/myorders");
    dispatch(orderListAction.orderSuccess(data.data));
  } catch (err) {
    dispatch(
      orderListAction.orderFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(orderListAction.orderRequest());
    const { data } = await axios.get("/api/v1/orders");
    dispatch(orderListAction.orderSuccess(data.data));
  } catch (err) {
    dispatch(
      orderListAction.orderFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
