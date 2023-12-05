import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import {
  Home,
  Cart,
  Checkout,
  Payement,
  PayementResult,
  Product,
  AdminOrders,
  AdminProducts,
  AdminStocks,
} from "../pages";

import { AdminLogin } from "../pages";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payement />} />
        <Route path="/payment-result" element={<PayementResult />} />
        <Route path="/products/:category?/:productId?" element={<Product />} />
        <Route path="/products-table" element={<AdminProducts />} />
        <Route path="/stocks-table" element={<AdminStocks />} />
        <Route path="/orders-table" element={<AdminOrders />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
