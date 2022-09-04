import React from "react";

export default function SingleOrder(props) {
  console.log(props);
  let ingredients = props.order.ingredients.map((item) => {
    return (
      <span key={item.type}>
        {item.type} X {item.amount}
      </span>
    );
  });
  return (
    <div className="single-order">
      <p>Order Number: {props.order.id}</p>
      <p>Delivery Address: {props.order.customer.deliveryAddress}</p>

      <div className="ingredients">{ingredients}</div>
      <p>Total: {props.order.price} BDT</p>
    </div>
  );
}
