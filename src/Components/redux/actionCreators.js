import * as actionTypes from "./actionTypes";

export const addIngredient = (ingreType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: ingreType,
  };
};

export const removeIngredient = (ingreType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: ingreType,
  };
};

export const updateOrderable = (ingreType) => {
  return {
    type: actionTypes.UPDATE_ORDERABLE,
  };
};
