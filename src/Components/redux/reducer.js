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
  orders: [],
  orderLoading: true,
  orderError: false,
  totalPrice: 80,
  orderable: false,
  token: null,
  userId: null,
  authLoading: false,
  authFailedMsg: null,
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

    case actionTypes.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          { type: "salad", amount: 0 },
          { type: "cheese", amount: 0 },
          { type: "meat", amount: 0 },
        ],
        totalPrice: 80,
        orderable: false,
      };

    case actionTypes.LOAD_ORDERS:
      let orders = [];
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
        });
      }
      return {
        ...state,
        orders: orders,
        orderLoading: false,
      };
    case actionTypes.ORDER_LOAD_FAILED:
      return {
        ...state,
        orderError: true,
        orderLoading: false,
      };

    //signup or login
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };

    //logout
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        authFailedMsg: null,
      };

    //showing spnner during signup or login
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };

    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authFailedMsg: action.payload,
      };

    default:
      return state;
  }
};
