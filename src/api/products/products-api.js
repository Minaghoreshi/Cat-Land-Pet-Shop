import axios from "axios";
import api from "../axios";
export const getProducts = async (page) => {
  const response = await api.get(`http://localhost:8000/api/products`, {
    params: {
      page,
      limit: 5,
    },
  });
  return response.data;
};
