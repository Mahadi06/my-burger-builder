import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "./Spinner/spinner";
import { Modal, ModalBody } from "reactstrap";
import { resetIngredients } from "./redux/actionCreators";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    orderable: state.orderable,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends React.Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "cash on delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
  };

  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = (e) => {
    this.setState({
      isLoading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };

    const token = localStorage.getItem("token");

    axios
      .post(
        "https://my-burger-builder-2ccc-default-rtdb.firebaseio.com/orders.json?auth=" +
          token,
        order
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            values: {
              deliveryAddress: "",
              phone: "",
              paymentType: "",
            },
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order Placed Successfully",
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something went wrong! order again",
          });
        }
      })
      .then((status) => console.log(status))
      .catch((error) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something went wrong! order again",
        });
        console.log(error);
      });

    e.preventDefault();
  };

  render() {
    let form = (
      <div>
        <h4>Payment:{this.props.totalPrice} BDT</h4>
        <form className="checkout-form w-50 m-auto mt-5">
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            placeholder="Your address"
            className="form-control"
            cols="30"
            rows="5"
            onChange={(e) => this.inputChangeHandler(e)}
          ></textarea>
          <br />
          <input
            type="number"
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Your phone number"
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <br />
          <select
            name="paymentType"
            className="form-control mb-3"
            value={this.state.values.paymentType}
            onChange={(e) => this.inputChangeHandler(e)}
          >
            <option>...Select your payment type...</option>
            <option value="Cash on delivery">Cash on delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <button
            style={{ backgroundColor: "#0077b6" }}
            type="submit"
            className="btn btn-primary "
            onClick={this.submitHandler}
            disabled={!this.props.orderable}
          >
            Place Order
          </button>
          <Link to="/">
            <button style={{ marginLeft: "10px" }} className="btn btn-danger">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
            <Link to="/">
              <button className="btn btn-secondary">Close</button>
            </Link>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
