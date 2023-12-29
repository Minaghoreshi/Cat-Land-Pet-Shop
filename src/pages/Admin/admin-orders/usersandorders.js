import {
  getUserById,
  getUserFirstName,
  getUserLastName,
} from "../../../api/users/users-api";
export const combineUsersWithOrders = async (orders) => {
  const usersWithOrders = [];
  for (const order of orders) {
    // const userFirstName = await getUserFirstName(order.user);
    // const userLastName = await getUserLastName(order.user);
    const user = await getUserById(order.user);
    const user2 = user.data.users[0];
    const userWithOrders = {
      ...order,
      userFirstName: user2.firstname,
      userLastName: user2.lastname,
      userPhoneNumber: user2.phoneNumber,
      userAddress: user2.address,
    };
    usersWithOrders.push(userWithOrders);
  }
  return usersWithOrders;
};
