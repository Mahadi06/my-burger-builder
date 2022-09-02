import React from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./Burger-Builder/BurgerBuilder";
import Orders from "./Orders";
import Checkout from "./Checkout";
import { Route, Routes } from "react-router";
const Main = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<BurgerBuilder />} />
      </Routes>
    </div>
  );
};

export default Main;
