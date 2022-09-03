import * as actionTypes from "./actionTypes";

const ingredientPrices = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

const initialState = {
  ingredients: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 80,
  orderable: false,
};

export const reducer = (state = initialState, action) => {
  const ingred = [...state.ingredients];

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (const item of ingred) {
        if (item.type === action.payload) item.amount++;
      }
      return {
        ...state,
        ingredients: ingred,
        totalPrice: state.totalPrice + ingredientPrices[action.payload],
      };

    case actionTypes.REMOVE_INGREDIENT:
      for (const item of ingred) {
        if (item.type === action.payload) {
          if (item.amount <= 0) return state;
          item.amount--;
        }
      }
      return {
        ...state,
        ingredients: ingred,
        totalPrice: state.totalPrice - ingredientPrices[action.payload],
      };

    case actionTypes.UPDATE_ORDERABLE:
      const sum = state.ingredients.reduce((sum, element) => {
        return sum + element.amount;
      }, 0);
      return {
        ...state,
        orderable: sum > 0,
      };
    default:
      return state;
  }
};
