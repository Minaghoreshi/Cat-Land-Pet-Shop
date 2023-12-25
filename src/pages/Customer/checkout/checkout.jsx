import React from "react";
import { CustomerLayout } from "../../../components";
import { UserCheckout } from "../../../components/widget/checkout-section/UserCheckout";

const Checkout = () => {
  return (
    <CustomerLayout>
      <UserCheckout />
    </CustomerLayout>
  );
};
export default Checkout;
