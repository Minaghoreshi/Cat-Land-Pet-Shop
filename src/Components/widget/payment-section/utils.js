import { addMultipleOrders } from "../../../api/orders/orders-api";
import { store } from "../../../store";
import { clearUserCart } from "../../../features/user/userSlice";

export const handleSubmit = (dispatch, navigate) => {
  const allOrders = store.getState().user.userCart;
  const userId = store.getState().user.userId;
  const OrdersToAdd = {
    user: userId,
    products: allOrders.map((order) => ({
      product: order._id,
      count: order.count,
    })),
    deliveryStatus: allOrders[0].deliveryDate,
  };
  console.log(OrdersToAdd);
  addMultipleOrders(OrdersToAdd);
  dispatch(clearUserCart());
  navigate("/payment-result", { state: { result: "success" } });
};
export const handleCancel = (navigate) => {
  navigate("/payment-result", { state: { result: "cancelled" } });
};
