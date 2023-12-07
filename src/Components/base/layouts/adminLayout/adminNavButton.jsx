import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminNavButton = () => {
  const [selectedButton, setSelectedButton] = useState("null");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Extract the last part of the pathname as the button name
    const buttonName = location.pathname.split("/").pop();
    setSelectedButton(buttonName);
  }, [location.pathname]);
  const handleClick = (buttonName, route) => {
    // setSelectedButton(buttonName);
    navigate(route);
  };
  return (
    <div>
      <button
        onClick={() => {
          handleClick("products", "/products-table");
        }}
        className={`admin--nav ${
          selectedButton === "products-table" ? "admin--nav--selected" : ""
        } `}
      >
        کالاها
      </button>
      <button
        onClick={() => {
          handleClick("stocks", "/stocks-table");
        }}
        className={`admin--nav ${
          selectedButton === "stocks-table" ? "admin--nav--selected" : ""
        } `}
      >
        موجودی و قیمت ها
      </button>
      <button
        onClick={() => {
          handleClick("orders", "/orders-table");
        }}
        className={`admin--nav ${
          selectedButton === "orders-table" ? "admin--nav--selected" : ""
        } `}
      >
        {" "}
        سفارشات
      </button>
    </div>
  );
};
