import React from "react";
import { Nav, Navbar, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assests/burgerLogo.png";

export default function Header() {
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
        <Nav className="mr-md-5">
          <NavLink to="/" className="navbar-link">
            Burger Builder
          </NavLink>
          <NavLink to="/orders" className="navbar-link ">
            Orders
          </NavLink>
          <NavLink to="/login" className="navbar-link ">
            Login
          </NavLink>
        </Nav>
      </Navbar>
    </div>
  );
}
