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
export const editProduct = async (formData, productID) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.patch(
      `http://localhost:8000/api/products/${productID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Product edited successfully:", response.data);
    return response.data; // Optionally, return the response data if needed
  } catch (error) {
    console.error("Error editing product:", error.message);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};
// export const addProduct = async (data) => {
//   console.log(data);
//   const token = localStorage.getItem("token");

//   try {
//     const response = await api.post(apiUrl, data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("Product added successfully:", response.data);
//   } catch (error) {
//     console.error("Error adding product:", error.message);
//   }
// };

//api for delting
export const deletProduct = async (productId) => {
  try {
    const response = await api.delete(
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
