import axios from "axios";
import api from "../axios";
export const getCategoryById = async (categoryId) => {
  const response = await api.get(
    `http://localhost:8000/api/categories/${categoryId}`
  );
  return response.data.data.category.name;
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/categories`);
    return response.data.data.categories;
  } catch (error) {
    console.log(error);
  }
};
