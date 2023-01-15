import axios from "axios";
import { userActions } from "./userSlice";
import { orderListAction } from "./orderListSlice";
import { orderAction } from "./orderSlice";
import { cartActions } from "./cartSlice";
import { userListAction } from "./userListSlice";
import { userDetailAction } from "./userDetailSlice";
import { UserForgetAction } from "./userForgetSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.userLoginRequest());

    const { data } = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    dispatch(userActions.userLoginSuccess(data));
  } catch (err) {
    dispatch(
      userActions.userLoginFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const register =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch(userActions.userRegisterRequest());

      const { data } = await axios({
        method: "POST",
        url: "/api/v1/users/signin",
        data: {
          email,
          password,
          name,
          passwordConfirm,
        },
      });

      dispatch(userActions.userRegisterSuccess(data));
    } catch (err) {
      dispatch(
        userActions.userRegisterFail(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const isLoggedIn = () => async (dispatch) => {
  const { data } = await axios({
    url: "/api/v1/users/isLoggedIn",
  });

  dispatch(userActions.isLoggedIn(data));
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });

    dispatch(userActions.userLogoutSuccess(data));
    if (localStorage.getItem("cart")) localStorage.removeItem("cart");
    if (localStorage.getItem("shipping")) localStorage.removeItem("shipping");
    dispatch(cartActions.cartReset());
    dispatch(orderListAction.orderReset());
    dispatch(orderAction.orderReset());
    dispatch(userActions.userReset());
    dispatch(userListAction.userListReset());
  } catch (err) {
    dispatch(
      userActions.userLogoutFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const updateMe = (name, email) => async (dispatch) => {
  try {
    dispatch(userActions.updateMeRequest());

    const { data } = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data: {
        email,
        name,
      },
    });

    dispatch(userActions.updateMeSuccess(data));
  } catch (err) {
    dispatch(
      userActions.updateMeFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const updateMyPassword =
  (passwordCurrent, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch(userActions.updateMeRequest());

      const { data } = await axios({
        method: "PATCH",
        url: "/api/v1/users/updateMyPassword",
        data: {
          passwordConfirm,
          password,
          passwordCurrent,
        },
      });

      dispatch(userActions.updateMeSuccess(data));
    } catch (err) {
      console.log(err.message);
      dispatch(
        userActions.updateMeFail(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };

export const getAllUsers = (page) => async (dispatch) => {
  try {
    dispatch(userListAction.userListRequest());

    const { data } = await axios({
      method: "GET",
      url: `/api/v1/users?page=${page}`,
    });

    dispatch(userListAction.userListSuccess(data));
  } catch (err) {
    console.log(err.message);
    dispatch(
      userListAction.userListFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userListAction.userListRequest());

    await axios({
      method: "DELETE",
      url: `/api/v1/users/${id}`,
    });

    dispatch(userListAction.userDelete());
  } catch (err) {
    console.log(err.message);
    dispatch(
      userListAction.userListFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const updateUserToAdmin = (id, role) => async (dispatch) => {
  try {
    dispatch(userDetailAction.userDetailRequest());

    await axios({
      method: "PATCH",
      url: `/api/v1/users/${id}`,
      data: { role },
    });
    dispatch(userDetailAction.userDetailUpdate());
  } catch (err) {
    console.log(err.message);
    dispatch(
      userListAction.userDetailFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userDetailAction.userDetailRequest());

    const { data } = await axios({
      method: "GET",
      url: `/api/v1/users/${id}`,
    });
    dispatch(userDetailAction.userDetailSuccess(data.data));
  } catch (err) {
    console.log(err.message);
    dispatch(
      userDetailAction.userDetailFailure(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch(UserForgetAction.UserForgetRequest());

    await axios({
      method: "POST",
      url: "/api/v1/users/forgetpassword",
      data: {
        email,
      },
    });

    dispatch(UserForgetAction.UserForgetSuccess());
  } catch (err) {
    dispatch(
      UserForgetAction.UserForgetFail(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const resetPassword =
  (password, passwordConfirm, token) => async (dispatch) => {
    try {
      dispatch(userActions.userLoginRequest());

      const { data } = await axios({
        method: "PATCH",
        url: `/api/v1/users/resetpassword/${token}`,
        data: {
          passwordConfirm,
          password,
        },
      });

      dispatch(userActions.userLoginSuccess(data));
    } catch (err) {
      dispatch(
        userActions.userLoginFailure(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
    }
  };
