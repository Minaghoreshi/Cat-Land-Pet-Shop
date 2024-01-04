import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const LogOutSign = ({ handleLogOut }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const menuTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(menuTimeoutRef.current);
    setMenuVisibility(true);
  };

  const handleMouseLeaveContainer = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMenuVisibility(false);
    }, 200);
  };

  const handleMouseEnterList = () => {
    clearTimeout(menuTimeoutRef.current);
  };

  const handleMouseLeaveList = () => {
    setMenuVisibility(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(menuTimeoutRef.current);
    };
  }, []);
  return (
    <div className="flex flex-col relative gap-7 items-end ">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveContainer}
        className="flex gap-2 items-end"
      >
        {" "}
        <Icon icon="line-md:account" width="30" height="30" />
        <span className="cursor-pointer"> پروفایل</span>
      </div>
      {isMenuVisible ? (
        <ul
          onMouseEnter={handleMouseEnterList}
          onMouseLeave={handleMouseLeaveList}
          className="flex flex-col p-5 gap-2 absolute top-full bg-white w-[126px] right-0 rounded-lg"
        >
          <Link to={"/user-orders"}>
            <li className="header--li">سفارش ها</li>{" "}
          </Link>
          <li onClick={handleLogOut} className="header--li">
            خروج
          </li>{" "}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
