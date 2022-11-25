import { cartActions } from "./cartSlice";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch(
    cartActions.addTocart({
      product: data.product._id,
      name: data.product.name,
      image: data.product.image,
      price: data.product.price,
      countInStock: data.product.countInStock,
      qty,
    })
  );
};
