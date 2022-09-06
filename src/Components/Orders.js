import React from "react";
import SingleOrder from "./SingleOrder";
import Spinner from "./Spinner/spinner";
import { connect } from "react-redux";
import { fetchOrders } from "./redux/actionCreators";

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderError: state.orderError,
    userId: state.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (userId) => dispatch(fetchOrders(userId)),
  };
};

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.userId);
  }

  render() {
    let orders = null;
    if (this.props.orderError) {
      orders = <h4 className="order-failed">Failed to load orders</h4>;
    } else {
      if (this.props.orders.length === 0) {
        orders = <h4 className="order-failed">There is no order.</h4>;
      } else {
        orders = this.props.orders.map((order) => {
          return <SingleOrder order={order} key={order.id} />;
        });
      }
    }

    return <div>{this.props.orderLoading ? <Spinner /> : orders}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
