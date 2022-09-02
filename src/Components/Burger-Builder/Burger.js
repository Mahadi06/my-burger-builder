import React from "react";
import Ingredients from "./Ingredients";

function Burger(props) {
  let ingredients = props.ingredients
    .map((item) => {
      let amountArr = [...Array(item.amount).keys()];
      return amountArr.map((_) => {
        return <Ingredients type={item.type} key={Math.random()} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (ingredients.length === 0) {
    ingredients = <p className="text-center">Please add some ingredients..</p>;
  }
  return (
    <div className="burger">
      <Ingredients type="bread-top" />
      {ingredients}
      <Ingredients type="bread-bottom" />
    </div>
  );
}

export default Burger;
