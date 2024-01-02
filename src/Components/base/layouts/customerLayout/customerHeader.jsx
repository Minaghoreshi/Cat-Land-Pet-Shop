import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/9005223.jpg";
import { Badge } from "flowbite-react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export const CustomerHeader = () => {
  const badge = useSelector((state) => state.user.badge);
  let navigate = useNavigate();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const menuTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    console.log(menuTimeoutRef);
    clearTimeout(menuTimeoutRef.current);
    setMenuVisibility(true);
  };

  const handleMouseLeaveContainer = () => {
    // Set a short delay before hiding the menu to allow moving to the list
    menuTimeoutRef.current = setTimeout(() => {
      setMenuVisibility(false);
    }, 100);
  };

  const handleMouseEnterList = () => {
    clearTimeout(menuTimeoutRef.current);
  };

  const handleMouseLeaveList = () => {
    // Hide the menu when leaving the list
    setMenuVisibility(false);
  };

  useEffect(() => {
    // Clear the timeout when the component is unmounted
    return () => {
      clearTimeout(menuTimeoutRef.current);
    };
  }, []);
  return (
    <header className="flex px-14 pt-5 pb-2 text-t bg-white items-center justify-between w-full">
      <div className="flex gap-3 items-center">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="h-16 w-16 cursor-pointer rounded-full"
          src={logo}
          alt="logo"
        />{" "}
        <h1 className=" font-bold text-3xl">کت لند</h1>
      </div>

      <div className="flex justify-self-end text-md">
        <div className="flex items-end gap-11">
          {" "}
          <div className="flex flex-col relative gap-2 items-end">
            <div
              className="flex gap-2 items-end"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeaveContainer}
            >
              {" "}
              <Icon
                icon="solar:hamburger-menu-linear"
                width="25"
                height="30"
                className="menu"
              />
              <span>حساب کاربری</span>
            </div>
            {isMenuVisible ? (
              <ul
                className="p-2 bg-white absolute w-[150px] top-10 right-0 flex flex-col gap-4"
                onMouseEnter={handleMouseEnterList}
                onMouseLeave={handleMouseLeaveList}
              >
                <li className="header--li">ورود</li>
                <li className="header--li">ثبت نام</li>
              </ul>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => {
              navigate("/admin-login");
            }}
          >
            {" "}
            پنل مدیریت
          </button>{" "}
          <div className="relative">
            <Icon icon="emojione:shopping-cart" width="40" height="40" />

            {badge > 0 ? (
              <Badge
                className="absolute top-[-1.5rem] left-2 text-base rounded"
                color="red"
              >
                {" "}
                {badge}
              </Badge>
            ) : (
              ""
            )}
          </div>
        </div>

        <div></div>
      </div>
    </header>
  );
};
