import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { HiPlus, HiMinus } from "react-icons/hi";

export const HomeSidebar = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      label: "اسباب بازی",
      isOpen: false,
      subItems: ["تست ", "تست "],
    },
    {
      id: 2,
      label: "غذا",
      isOpen: false,
      subItems: ["تست ", "تست "],
    },
    // Add more items as needed
  ]);

  const toggleSubMenu = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      })
    );
  };

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item.id} className="sidebar-item">
          <button className="item-label" onClick={() => toggleSubMenu(item.id)}>
            {!item.isOpen ? <HiPlus /> : <HiMinus />}
            {item.label}
          </button>
          {item.isOpen && (
            <ul className="sub-items">
              {item.subItems.map((subItem, index) => (
                <li key={index} className="sub-items-li">
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>

    // <Sidebar.Collapse
    //   className="rtl:text-right"
    //   renderChevronIcon={(theme, open) => {
    //     const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

    //     return (
    //       <IconComponent
    //         aria-hidden
    //         className={twMerge(theme.label.icon.open[open ? "on" : "off"])}
    //       />
    //     );
    //   }}
    //   label={category}
    // >
    //   <Sidebar.Item href="#">Products</Sidebar.Item>
    //   <Sidebar.Item href="#">Sales</Sidebar.Item>
    //   <Sidebar.Item href="#">Refunds</Sidebar.Item>
    //   <Sidebar.Item href="#">Shipping</Sidebar.Item>
    // </Sidebar.Collapse>
  );
};
