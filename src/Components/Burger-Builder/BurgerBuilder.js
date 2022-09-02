import React from "react";
import Burger from "./Burger";
import Control from "./Control";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Summery from "../Summary";
import { Link } from "react-router-dom";
import { connect, Connect } from "react-redux/es/exports";
import {
  addIngredient,
  removeIngredient,
  updateOrderable,
} from "../redux/actionCreators";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    orderable: state.orderable,
  };
};

class BurgerBuilder extends React.Component {
  state = {
    modalOpen: false,
  };

  updateOrderable = (ingredients) => {
    const sum = ingredients.reduce((sum, element) => {
      return sum + element.amount;
    }, 0);
    this.setState({ orderable: sum > 0 });
    console.log(this.state.orderable);
  };

  addIngredient = (type) => {
    const ingred = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + ingredientPrices[type];
    for (const item of ingred) {
      if (item.type === type) item.amount++;
    }
    this.setState({ ingredients: ingred, totalPrice: newPrice });
    this.updateOrderable(ingred);
  };

  removeIngredient = (type) => {
    const ingred = [...this.state.ingredients];

    let newPrice = this.state.totalPrice - ingredientPrices[type];

    for (const item of ingred) {
      if (item.type === type) {
        if (item.amount <= 0) return;
        item.amount--;
      }
    }

    this.setState({ ingredients: ingred, totalPrice: newPrice });
    this.updateOrderable(ingred);
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  render() {
    return (
      <div>
        <div className="container d-flex flex-md-row flex-column justify-content-center gap-5">
          <Burger ingredients={this.props.ingredients} />
          <Control
            ingredientsAdded={this.addIngredient}
            ingredientsRemoved={this.removeIngredient}
            price={this.props.totalPrice}
            turnOnModal={this.toggleModal}
            orderable={this.props.orderable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Order Summery</ModalHeader>
          <ModalBody>
            <h4>Total Price:{this.props.totalPrice.toFixed(0)}</h4>
            <Summery ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Link to="/checkout">
              <button onClick={this.handleCheckout} className="btn btn-success">
                Continue to Checkout
              </button>
            </Link>

            <button onClick={this.toggleModal} className="btn btn-warning">
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BurgerBuilder);
