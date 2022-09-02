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

export const reducer = (state = initialState.action) => {
  switch (action.type) {
    default:
      return state;
  }
};
