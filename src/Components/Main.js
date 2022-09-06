import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./Burger-Builder/BurgerBuilder";
import Orders from "./Orders";
import Checkout from "./Checkout";
import { Route, Routes, Navigate } from "react-router";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";

import { authCheck } from "./redux/authActionCreators";
import Logout from "./Auth/Logout";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

class Main extends React.Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    let routes = null;
    if (this.props.token == null) {
      routes = (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    }
    return (
      <div>
        <Header />
        {routes}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
