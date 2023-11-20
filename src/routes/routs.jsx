import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/home/home";
import AdminLogin from "../pages/admin-login/admin-login";
import Admin from "../pages/admin/admin";
import Cart from "../pages/cart/cart";
import Checkout from "../pages/checkout/checkout";
import Payment from "../pages/payment/payment";
import PaymentResult from "../pages/payment-result/payment-result";
import Product from "../pages/product/product";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-reciept" element={<PaymentResult />} />
        <Route path="/products/:category?/:productId?" element={<Product />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
