import axios from "axios";
export const getAllOrders = async () => {
  const response = await axios.get(`http://localhost:8000/api/orders`);
  return response.data;
};
