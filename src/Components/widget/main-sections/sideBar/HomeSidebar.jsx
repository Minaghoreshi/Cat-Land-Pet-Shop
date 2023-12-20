import React, { useEffect, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useQuery } from "react-query";
import { getAllCategories } from "../../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../../api/subcategory/subcategory-api";

export const HomeSidebar = ({ menuItems, setMenuItems }) => {
  const showSubCategory = (categoryId) => {
    setMenuItems((prevItems) => {
      return prevItems.map((item) =>
        item._id === categoryId ? { ...item, isOpen: !item.isOpen } : item
      );
    });
  };

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item._id} className="sidebar-item">
          <div className="item-label">
            {!item.isOpen ? (
              <HiPlus
                className="cursor-pointer"
                onClick={() => showSubCategory(item._id)}
              />
            ) : (
              <HiMinus
                className="cursor-pointer"
                onClick={() => showSubCategory(item._id)}
              />
            )}
            <span>{item.name}</span>
          </div>
          <hr />
          {item.isOpen && (
            <ul className="sub-items">
              {item.subCategories.map((subcategory, index) => (
                <li key={subcategory._id} className="sub-items-li">
                  {subcategory.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
