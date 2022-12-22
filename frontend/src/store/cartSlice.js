import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addTocart(state, action) {
      const item = action.payload;
      const itemExist = state.cart.findIndex(
        (el) => el.product === item.product
      );

      if (itemExist === -1)
        state.cart.push({ ...item, price: item.price * item.qty });
      else {
        state.cart[itemExist].qty = item.qty;
        state.cart[itemExist].price = item.price * item.qty;
      }
    },

    removeFromCart(state, action) {
      const item = action.payload;

      const itemIndex = state.cart.findIndex((el) => el.product === item);

      state.cart.splice(itemIndex, 1);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
