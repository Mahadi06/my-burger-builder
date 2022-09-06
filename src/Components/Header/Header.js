import React from "react";
import { Nav, Navbar, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assests/burgerLogo.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

function Header(props) {
  let links = null;
  if (props.token === null) {
    links = (
      <Nav className="mr-md-5">
        <NavLink to="/login" className="navbar-link ">
          Login
        </NavLink>
      </Nav>
    );
  } else {
    links = (
      <Nav className="mr-md-5">
        <NavLink to="/" className="navbar-link">
          Burger Builder
        </NavLink>
        <NavLink to="/orders" className="navbar-link ">
          Orders
        </NavLink>
        <NavLink to="/logout" className="navbar-link ">
          Logout
        </NavLink>
      </Nav>
    );
  }

  return (
    <div className="">
      <Navbar className="" style={{ backgroundColor: "#0077b6" }}>
        <NavbarBrand
          style={{ color: "#ffd60a" }}
          className="mr-auto ml-md-5 "
          href="/"
        >
          <img src={Logo} alt="" className="logo" />{" "}
          <span className="logo-title">Burger</span>
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  );
}

export default connect(mapStateToProps)(Header);
