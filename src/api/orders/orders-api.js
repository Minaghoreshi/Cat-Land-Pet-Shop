import axios from "axios";
export const getAllOrders = async (page) => {
  const response = await axios.get(`http://localhost:8000/api/orders`, {
    params: {
      page,
      limit: 5,
    },
  });
  return response.data;
};
