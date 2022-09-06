import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (igtype) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: igtype,
  };
};

export const removeIngredient = (igtype) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: igtype,
  };
};

export const updateOrderable = () => {
  return {
    type: actionTypes.UPDATE_ORDERABLE,
  };
};

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS,
  };
};

export const loadOrders = (orders) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: orders,
  };
};

export const orderLoadFailed = () => {
  return {
    type: actionTypes.ORDER_LOAD_FAILED,
  };
};

export const fetchOrders = (userId) => (dispatch) => {
  const token = localStorage.getItem("token");
  const userIdParams = '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get(
      "https://my-burger-builder-2ccc-default-rtdb.firebaseio.com/orders.json?auth=" +
        token +
        userIdParams
    )
    .then((res) => dispatch(loadOrders(res.data)))
    .catch((err) => {
      dispatch(orderLoadFailed());
    });
};
