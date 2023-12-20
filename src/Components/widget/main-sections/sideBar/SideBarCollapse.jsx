import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { HiPlus } from "react-icons/hi";

export const SideBarCollapse = ({ category }) => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      label: "Item 1",
      isOpen: false,
      subItems: ["Subitem 1.1", "Subitem 1.2"],
    },
    {
      id: 2,
      label: "Item 2",
      isOpen: false,
      subItems: ["Subitem 2.1", "Subitem 2.2"],
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
            {!item.isOpen ? <HiPlus /> : ""}
            {item.label}
          </button>
          {item.isOpen && (
            <ul className="sub-items">
              {item.subItems.map((subItem, index) => (
                <li key={index}>{subItem}</li>
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
