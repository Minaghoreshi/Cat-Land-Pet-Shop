import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/9005223.jpg";
import { Badge } from "flowbite-react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { CategoryNav } from "../../../widget/category-nav/CategoryNav";
export const CustomerHeader = () => {
  const badge = useSelector((state) => state.user.badge);
  let navigate = useNavigate();
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
    <header className="flex px-14 pt-5 pb-2 text-t bg-white items-center justify-evenly w-full relative">
      <div
        className="flex gap-3 items-center cursor-pointer "
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="h-16 w-16 rounded-full" src={logo} alt="logo" />{" "}
        <h1 className=" font-bold text-3xl">کت لند</h1>
      </div>
      <div className="flex justify-self-end text-md">
        <div className="flex items-end gap-11">
          {" "}
          <span
            className="cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveContainer}
          >
            دسته بندی
          </span>{" "}
          <div className="flex flex-col relative gap-2 items-end">
            <div className="flex gap-2 items-end">
              {" "}
              <Icon icon="line-md:account" width="30" height="30" />
              <Link to={"/user-login"}>
                <span className="header--li">ورود / ثبت نام</span>
              </Link>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/admin-login");
            }}
          >
            {" "}
            پنل مدیریت
          </button>{" "}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Icon icon="emojione:shopping-cart" width="35" height="35" />

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
      </div>{" "}
      {isMenuVisible ? (
        <CategoryNav
          classname=" duration-500 transition-opacity ease-in-out absolute top-full"
          onMouseEnter={handleMouseEnterList}
          onMouseLeave={handleMouseLeaveList}
        />
      ) : (
        ""
      )}
    </header>
  );
};
