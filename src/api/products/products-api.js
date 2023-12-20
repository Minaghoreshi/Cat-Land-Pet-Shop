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
export const addEditedProduct = async (formData, productID) => {
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
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error.message);
    throw error;
  }
};

export const addNewProduct = async (formData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `http://localhost:8000/api/products`,
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

export const addMultipleEditedProduct = async (dataToSend) => {
  try {
    const promises = dataToSend.map(async (product) => {
      const { productId, ...formData } = product;

      const formDataObject = new FormData();
      for (const key in formData) {
        formDataObject.append(key, formData[key]);
      }

      return await addEditedProduct(formDataObject, productId);
    });

    const editedProducts = await Promise.all(promises);

    console.log("Products edited successfully:", editedProducts);
    return editedProducts;
  } catch (error) {
    console.log(error);
    console.error("Error editing products:", error.message);
    throw error;
  }
};

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
export const getProductsByCategory = async (categoryId) => {
  const params = {
    category: categoryId,
  };

  const response = await api.get(apiUrl, {
    params,
  });

  return response.data.data.products;
};
