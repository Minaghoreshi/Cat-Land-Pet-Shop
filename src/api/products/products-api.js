import api from "../axios";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:8000/api/products";

export const getProducts = async (page) => {
  const response = await api.get(apiUrl, {
    params: {
      page,
      limit: 5,
    },
  });
  return response.data;
};

export const addEditedProduct = async (formData, productID) => {
  const token = Cookies.get("token");
  try {
    const response = await api.patch(`${apiUrl}/${productID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Product edited successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error.message);
  }
};

export const addNewProduct = async (formData) => {
  const token = Cookies.get("token");
  try {
    const response = await api.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Product added successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      return null;
    }

    // If it's not a 401 error, log it as an actual error
    else {
      console.error(error);
    }
    // Rethrow the error to handle it in the calling code if needed
    throw error;
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
    console.error("Error editing products:", error.message);
  }
};

// API for deleting
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`${apiUrl}/${productId}`);

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

export const getProductsBySubcategory = async (subCategoryId) => {
  const params = {
    subcategory: subCategoryId,
  };

  const response = await api.get(apiUrl, {
    params,
  });

  return response.data.data.products;
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`${apiUrl}/${productId}`);
    return response.data.data.product;
  } catch (error) {
    console.error(error);
  }
};
