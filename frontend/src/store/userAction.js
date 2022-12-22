import axios from "axios";
import { userActions } from "./userSlice";

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
  const { data } = await axios({
    url: "/api/v1/users/logout",
  });

  dispatch(userActions.userLogoutSuccess(data));
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
