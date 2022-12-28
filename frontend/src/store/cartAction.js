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

  const getItem1 = localStorage.getItem("cart");

  if (getItem1) {
    const getItem = JSON.parse(getItem1);
    const index = getItem.findIndex((el) => el.product === id);
    if (index > -1) {
      if (getItem[index].qty === qty) return;
      else {
        getItem.splice(index, 1);
      }
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(
        getItem.concat([
          {
            product: data.product._id,
            name: data.product.name,
            image: data.product.image,
            price: data.product.price,
            //countInStock: data.product.countInStock,
            qty,
          },
        ])
      )
    );
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          product: data.product._id,
          name: data.product.name,
          image: data.product.image,
          price: data.product.price,
          //countInStock: data.product.countInStock,
          qty,
        },
      ])
    );
  }
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch(cartActions.removeFromCart(id));

  const getItem1 = localStorage.getItem("cart");
  const getItem = JSON.parse(getItem1);
  const index = getItem.findIndex((el) => el.product === id);
  getItem.splice(index, 1);
  if (getItem.length === 0) localStorage.removeItem("cart");
  else localStorage.setItem("cart", JSON.stringify(getItem));
};
