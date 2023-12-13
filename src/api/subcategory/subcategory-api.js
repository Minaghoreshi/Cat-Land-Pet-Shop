import axios from "axios";
import api from "../axios";
// export const getSubCategoryById = (subcategoryId) => {
//   const response = await axios.get(
//     `http://localhost:8000/api/subcategories/${subcategoryId}`
//   );
//   return response.data.data.category.name;};
export const getSubCategoryById = async (subcategoryId) => {
  const response = await api.get(
    `http://localhost:8000/api/subcategories/${subcategoryId}`
  );
  return response.data.data.subcategory.name;
};
