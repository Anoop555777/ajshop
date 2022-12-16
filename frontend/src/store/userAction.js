import axios from "axios";
import { userActions } from "./userSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.userLoginRequest);

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

export const isLoggedIn = () => async (dispatch) => {
  const { data } = await axios({
    url: "/api/v1/users/isLoggedIn",
  });

  console.log(data);

  dispatch(userActions.isLoggedIn(data));
};
