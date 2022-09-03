import * as actionTypes from "./actionTypes";

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
