import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import productListSlice from "./productListSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import orderList from "./orderListSlice";
import userList from "./userListSlice";
import userDetailSlice from "./userDetailSlice";
import productCreateSlice from "./productCreateSlice";
import productEditSlice from "./productEditSlice";
import orderDeliverSlice from "./orderDeliverSlice";
import productReviewSlice from "./productReviewSlice";
const middleware = [thunk];
const store = configureStore(
  {
    reducer: {
      productList: productListSlice,
      product: productSlice,
      cartItem: cartSlice,
      user: userSlice,
      order: orderSlice,
      orderList: orderList,
      userList: userList,
      userDetail: userDetailSlice,
      productCreate: productCreateSlice,
      productEdit: productEditSlice,
      orderDeliver: orderDeliverSlice,
      productReview: productReviewSlice,
    },
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
