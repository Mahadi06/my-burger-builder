import React from "react";
import BreadTop from "../../assests/img/top.png";
import BreadBottom from "../../assests/img/bottom.png";
import Meat from "../../assests/img/meat.png";
import Salad from "../../assests/img/salad.png";
import Cheese from "../../assests/img/cheese.png";

function Ingredients(props) {
  let ingredient = null;
  switch (props.type) {
    case "bread-top":
      ingredient = (
        <div>
          <img src={BreadTop} alt="bread top" />
        </div>
      );
      break;
    case "meat":
      ingredient = (
        <div>
          <img src={Meat} alt="meat" />
        </div>
      );
      break;
    case "salad":
      ingredient = (
        <div>
          <img src={Salad} alt="salad" />
        </div>
      );
      break;
    case "cheese":
      ingredient = (
        <div>
          <img src={Cheese} alt="cheese" />
        </div>
      );
      break;
    case "bread-bottom":
      ingredient = (
        <div>
          <img src={BreadBottom} alt="bread bottom" />{" "}
        </div>
      );
      break;
    default:
      ingredient = null;
  }
  return <div className="text-center">{ingredient}</div>;
}
export default Ingredients;
