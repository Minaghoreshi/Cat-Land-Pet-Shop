import axios from "axios";
import api from "../axios";

export const getSubCategoryById = async (subcategoryId) => {
  const response = await api.get(
    `http://localhost:8000/api/subcategories/${subcategoryId}`
  );
  return response.data.data.subcategory.name;
};
export const getSubCategoryByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/subcategories",
      {
        params: {
          category: categoryId,
        },
      }
    );
    const subcategories = response.data.data.subcategories;
    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
  }
};
