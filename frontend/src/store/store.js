import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import productListSlice from "./productListSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
const middleware = [thunk];
const store = configureStore(
  {
    reducer: {
      productList: productListSlice,
      product: productSlice,
      cartItem: cartSlice,
      user: userSlice,
      order: orderSlice,
    },
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
