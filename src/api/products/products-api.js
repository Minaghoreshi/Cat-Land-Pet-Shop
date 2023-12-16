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
export const addProduct = async (data) => {
  console.log(data);
  const apiUrl = "http://localhost:8000/api/products";
  const token = localStorage.getItem("token");

  try {
    const response = await api.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Product added successfully:", response.data);
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};
