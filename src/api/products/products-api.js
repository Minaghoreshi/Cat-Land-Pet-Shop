import axios from "axios";

export const getProducts = async (page) => {
  const response = await axios.get(`http://localhost:8000/api/products`, {
    params: {
      page,
      limit: 5,
      fields: "-rating,-createdAt,-updatedAt,-__v",
      sort: "price",
      "quantity[gte]": 8,
    },
  });
  return response.data.data.products;
};
