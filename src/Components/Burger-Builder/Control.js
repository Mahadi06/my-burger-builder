import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";

const controls = [
  { label: "salad", type: "salad" },
  { label: "cheese", type: "cheese" },
  { label: "meat", type: "meat" },
];

function BuildControl(props) {
  return (
    <div className="d-flex justify-content-between">
      <p className="fw-bold">{props.label.toUpperCase()}</p>
      <div>
        <span onClick={props.added} className="add-item btn btn-sm btn-success">
          <span className="material-symbols-outlined ">add</span>
        </span>
        <span
          onClick={props.removed}
          className="remove-item btn btn-sm btn-danger"
        >
          <span className="material-symbols-outlined ">remove</span>
        </span>
      </div>
    </div>
  );
}

export default function Control(props) {
  return (
    <div>
      <Card className="card-starter">
        <CardHeader className="card-title">Add Ingredients</CardHeader>
        <CardBody>
          {controls.map((item) => {
            return (
              <BuildControl
                label={item.label}
                type={item.type}
                key={Math.random()}
                added={() => props.ingredientsAdded(item.type)}
                removed={() => props.ingredientsRemoved(item.type)}
              />
            );
          })}
        </CardBody>
        <CardFooter>Price:{props.price}</CardFooter>
        <Button
          onClick={props.turnOnModal}
          disabled={!props.orderable}
          color="primary"
        >
          Order Now
        </Button>
      </Card>
    </div>
  );
}
