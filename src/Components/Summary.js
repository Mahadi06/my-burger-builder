import React from "react";

export default function Summery(props) {
  const ingredientsSummary = props.ingredients.map((item) => {
    return (
      <li key={item.type}>
        <span className="fw-bold">{item.type.toUpperCase()}</span> :{" "}
        {item.amount}
      </li>
    );
  });

  return (
    <div>
      <ul>{ingredientsSummary}</ul>
    </div>
  );
}
