import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../pages/Customer/home/home";
import AdminLogin from "../pages/Admin/admin-login/admin-login";
import ProductManagement from "../pages/Admin/product-management/product-management";
import Cart from "../pages/Customer/cart/cart";
import Checkout from "../pages/Customer/checkout/checkout";
import Payment from "../pages/Customer/payment/payment";
import PaymentResult from "../pages/Customer/payment-result/payment-result";
import Product from "../pages/Customer/product/product";
import { StockPrice } from "../pages/Admin/stock-price/stock-price";
import { Orders } from "../pages/Admin/orders/orders";
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
