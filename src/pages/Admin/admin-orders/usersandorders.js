import {
  getUserFirstName,
  getUserLastName,
} from "../../../api/users/users-api";
export const combineUsersWithOrders = async (orders) => {
  const usersWithOrders = [];
  for (const order of orders) {
    const userFirstName = await getUserFirstName(order.user);
    const userLastName = await getUserLastName(order.user);
    const userWithOrders = {
      ...order,
      userFirstName,
      userLastName,
    };
    usersWithOrders.push(userWithOrders);
  }
  return usersWithOrders;
};
