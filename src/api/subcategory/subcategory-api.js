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
export const getSubCategoryByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/subcategories",
      {
        params: {
          category: categoryId,
          // Add more filters as needed
        },
      }
    );

    // Handle the response data
    const subcategories = response.data.data.subcategories;
    return subcategories;

    // You can update your state or perform other actions with the subcategories here
  } catch (error) {
    // Handle errors
    console.error("Error fetching subcategories:", error);
  }
};
