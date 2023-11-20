import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import {
  Home,
  Cart,
  Checkout,
  Payment,
  PaymentResult,
  Product,
} from "../pages";

import { StockPrice, Orders, ProductManagement, AdminLogin } from "../pages";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<ProductManagement />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/products/:category?/:productId?" element={<Product />} />
        <Route path="/stock-price" element={<StockPrice />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
