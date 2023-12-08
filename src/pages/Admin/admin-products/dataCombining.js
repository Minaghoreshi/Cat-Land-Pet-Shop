import { getCategoryById } from "../../../api/category/category-api";
import { getSubCategoryById } from "../../../api/subcategory/subcategory-api";
export const combineProductsWithCategories = async (products) => {
  const productsWithCategories = [];

  for (const product of products) {
    const category = await getCategoryById(product.category);
    const subCategory = await getSubCategoryById(product.subcategory);

    const productWithCategory = {
      ...product,
      category,
      subCategory,
    };

    productsWithCategories.push(productWithCategory);
  }

  return productsWithCategories;
};
