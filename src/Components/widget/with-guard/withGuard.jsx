import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "../../../pages/Admin/admin-login/admin-login";
import { LoginLayout } from "../../base";
import { LoginForm } from "../../base";
// export const WithGaurd = (Component) => (props) => {
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   return isLogin ? <Component {...props} /> : <AdminLogin />;
// };

export const WithGuard = (Component) => {
  const GuarderComponent = (props) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    // console.log(isLogin);
    return isLogin ? <Component /> : <AdminLogin shouldNavigate={false} />;
  };
  return GuarderComponent;
};