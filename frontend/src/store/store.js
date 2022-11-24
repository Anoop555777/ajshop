import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import productListSlice from "./productListSlice";
import productSlice from "./productSlice";
import { configureStore } from "@reduxjs/toolkit";
const middleware = [thunk];
const store = configureStore(
  { reducer: { productList: productListSlice, product: productSlice } },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
