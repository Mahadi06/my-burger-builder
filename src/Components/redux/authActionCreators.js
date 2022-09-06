import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authLoading = (isLoading) => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: isLoading,
  };
};

export const auth = (email, password, mode) => (dispatch) => {
  dispatch(authLoading(true));

  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  console.log(authData);
  let authUrl;
  const apiKey = "AIzaSyAFmt_uhjsKGkynTtR8wBdeYe7o3NfVit0";

  if (mode === "signup") {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  axios
    .post(authUrl + apiKey, authData)
    .then((res) => {
      dispatch(authLoading(false));
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("userId", res.data.localId);

      const expirationTime = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );

      console.log(res.data.expiresIn);
      localStorage.setItem("expirationTime", expirationTime);

      dispatch(authSuccess(res.data.idToken, res.data.localId));
    })
    .catch((err) => {
      dispatch(authLoading(false));
      console.log(err);
    });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));

    if (expirationTime < new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  }
};
