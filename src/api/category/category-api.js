import axios from "axios";
export const getCategoryById = async (categoryId) => {
  const response = await axios.get(
    `http://localhost:8000/api/categories/${categoryId}`
  );
  return response.data.data.category.name;
};
