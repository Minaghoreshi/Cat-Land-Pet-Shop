import React, { useEffect, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../../api/subcategory/subcategory-api";

export const HomeSidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const {
    data: category,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery(["test"], getAllCategories);

  useEffect(() => {
    if (category) {
      setMenuItems(
        category.map((category, index) => {
          return {
            name: category.name,
            _id: category._id,
            isOpen: false,
            subItems: [],
          };
        })
      );
    }
  }, [category]);

  const fetchSubItems = async (categoryId) => {
    try {
      const res = await getSubCategoryByCategoryId(categoryId);
      if (res) {
        setMenuItems((prevItems) => {
          return prevItems.map((item) =>
            item._id === categoryId
              ? { ...item, isOpen: !item.isOpen, subItems: res }
              : item
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (categoryLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError) {
    console.error("Error fetching data:", categoryError);
    return <p>Error fetching data</p>;
  }

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item._id} className="sidebar-item">
          <div className="item-label">
            {!item.isOpen ? (
              <HiPlus
                className="cursor-pointer"
                onClick={() => fetchSubItems(item._id)}
              />
            ) : (
              <HiMinus
                className="cursor-pointer"
                onClick={() => fetchSubItems(item._id)}
              />
            )}
            <span>{item.name}</span>
          </div>
          <hr />
          {item.isOpen && (
            <ul className="sub-items">
              {item.subItems.map((subItem, index) => (
                <li key={subItem._id} className="sub-items-li">
                  {subItem.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
