import React, { useEffect, useState } from "react";
import { ProductsSection } from "./products-section/ProductsSection";
import { HomeSidebar } from "../sideBar/HomeSidebar";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { getProductsByCategory } from "../../../api/products/products-api";
import { useSelector } from "react-redux";
export const Main = () => {
  const check = useSelector((state) => state.auth.isLogin);
  console.log(check);
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
          return { categoryId: category._id, products: [] }; // Handle error, assuming an empty array for products
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
    console.error("Error fetching data:", categoryError);
    return <p>Error fetching data</p>;
  }
  return (
    <div className="flex mt-8 gap-16">
      <HomeSidebar
        menuItems={menuItems}
        setMenuItems={setMenuItems}
      ></HomeSidebar>
      <ProductsSection menuItems={menuItems}></ProductsSection>
    </div>
  );
};
