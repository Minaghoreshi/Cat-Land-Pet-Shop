import axios from "axios";
import api from "../axios";
const apiUrl = "http://localhost:8000/api/products";
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

//api for delting
export const deletProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/products/${productId}`
    );

    // Handle the response data
    return response.status;

    // You can update your state or perform other actions with the subcategories here
  } catch (error) {
    // Handle errors
    console.error("Error deleting product:", error);
  }
};
