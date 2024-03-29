import React, { useEffect, useState } from "react";
import { ProductsSection } from "./products-section/ProductsSection";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { getProductsByCategory } from "../../../api/products/products-api";
import { Hero } from "./hero/Hero";
import { Error } from "../error";

export const Main = () => {
  const [menuItems, setMenuItems] = useState([]);
  const {
    data: category,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery(["test"], getAllCategories);
  const fetchSubCategories = async () => {
    if (category) {
      const promises = category.map(async (category) => {
        try {
          const res = await getSubCategoryByCategoryId(category._id);
          return {
            name: category.name,
            _id: category._id,
            isOpen: false,
            subCategories: res,
          };
        } catch (error) {
          console.log(error);
          return {
            name: category.name,
            _id: category._id,
            isOpen: false,
            subCategories: [],
          };
        }
      });

      const resolvedMenuItems = await Promise.all(promises);
      setMenuItems(resolvedMenuItems);
    }
  };
  const fetchProductsForCategories = async () => {
    if (category) {
      const productPromises = category.map(async (category) => {
        try {
          const productsRes = await getProductsByCategory(category._id);
          return { categoryId: category._id, products: productsRes };
        } catch (error) {
          console.log(error);
          return { categoryId: category._id, products: [] };
        }
      });

      const resolvedProducts = await Promise.all(productPromises);
      setMenuItems((prevItems) =>
        prevItems.map((item) => {
          const matchingProductItem = resolvedProducts.find(
            (productItem) => productItem.categoryId === item._id
          );
          return matchingProductItem
            ? { ...item, products: matchingProductItem.products }
            : item;
        })
      );
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchProductsForCategories();
  }, [category]);
  if (categoryLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError) {
    return <Error />;
  }
  return (
    <div className="flex flex-col items-center pt-4 gap-16 overflow-y-auto overflow-x-hidden no-scrollbar max-w-full">
      {" "}
      <Hero className="w-screen lg:w-[1622px] max-h-96 rounded-lg" />
      <ProductsSection menuItems={menuItems}></ProductsSection>
    </div>
  );
};
