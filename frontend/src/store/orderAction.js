import { orderAction } from "./orderSlice";
import { orderPayAction } from "./orderPaySlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MM6CoSBmivHvCB6Ly5VN8fifBkg4JsFH3MGSOYEt4K2BjBWyxtLBmC21jNgXgcerPvIBrEP0U33LAJRcfjJqS0Q00ZHZO6l7d"
);

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

export const getSession = (id) => async (dispatch) => {
  try {
    const stripe = await stripePromise;
    const session = await axios.get(`/api/v1/orders/checkout-session/${id}`);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    dispatch(orderPayAction.orderSuccess());
  } catch (err) {
    dispatch(
      orderPayAction.orderFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};
