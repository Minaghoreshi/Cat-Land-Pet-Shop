import axios from "axios";
import api from "../axios";
export const getCategoryById = async (categoryId) => {
  const response = await api.get(
    `http://localhost:8000/api/categories/${categoryId}`
  );
  return response.data.data.category.name;
};
