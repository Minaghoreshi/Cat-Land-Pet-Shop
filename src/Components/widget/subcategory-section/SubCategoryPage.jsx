import React, { useEffect, useState } from "react";
import { HomeSidebar } from "../sideBar/HomeSidebar";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { useParams } from "react-router-dom";
import { MainSubCategory } from "./MainSubCategory";
export const SubCategoryPage = () => {
  const { id } = useParams();
  console.log(id);
  const [menuItems, setMenuItems] = useState([]);
  const {
    data: category,
    error,
    isLoading,
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
  useEffect(() => {
    fetchSubCategories();
  }, [category]);

  return (
    <div className="flex mt-8 gap-16">
      <HomeSidebar menuItems={menuItems} setMenuItems={setMenuItems} />
      <MainSubCategory sub={id} />
    </div>
  );
};
