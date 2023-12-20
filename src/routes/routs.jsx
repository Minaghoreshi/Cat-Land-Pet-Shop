import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { lazy } from "react";
import { Loadable } from "../components/base/loadable/Loadable";
const Home = Loadable(lazy(() => import("../pages/Customer/home/home")));
const AdminLogin = Loadable(
  lazy(() => import("../pages/Admin/admin-login/admin-login"))
);
const Cart = Loadable(lazy(() => import("../pages/Customer/cart/cart")));
const Checkout = Loadable(
  lazy(() => import("../pages/Customer/checkout/checkout"))
);
const Payement = Loadable(
  lazy(() => import("../pages/Customer/payement/payement"))
);
const PayementResult = Loadable(
  lazy(() => import("../pages/Customer/payement-result/payement-result"))
);
const Product = Loadable(
  lazy(() => import("../pages/Customer/product/product"))
);
const AdminProducts = Loadable(
  lazy(() => import("../pages/Admin/admin-products/AdminProducts"))
);
const AdminStocks = Loadable(
  lazy(() => import("../pages/Admin/admin-stock/stock-price"))
);
const AdminOrders = Loadable(
  lazy(() => import("../pages/Admin/admin-orders/AdminOrders"))
);
const Category = Loadable(
  lazy(() => import("../pages/Customer/category/Category"))
);
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
        <Route path="/category" element={<Category />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoute;
