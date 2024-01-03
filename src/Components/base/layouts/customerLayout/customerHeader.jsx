import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/9005223.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { CategoryNav } from "../../../widget/category-nav/CategoryNav";
import { userLogOut } from "../../../../features/user/userSlice";
import { LoginSign } from "./LoginSign";
import { LogOutSign } from "./LogOutSign";
import { CartSign } from "./CartSign";
export const CustomerHeader = () => {
  const badge = useSelector((state) => state.user.badge);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const menuTimeoutRef = useRef(null);
  const isUserLogin = useSelector((state) => state.user.isLogin);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    clearTimeout(menuTimeoutRef.current);
    setMenuVisibility(true);
  };
  const handleLogOut = () => {
    dispatch(userLogOut());
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
    <header className="flex px-14 pt-5 pb-2 text-t bg-white items-center justify-evenly w-full relative shadow-custom">
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
          {isUserLogin ? (
            <LogOutSign handleLogOut={handleLogOut} />
          ) : (
            <LoginSign />
          )}
          <button
            onClick={() => {
              navigate("/admin-login");
            }}
          >
            {" "}
            پنل مدیریت
          </button>{" "}
          <CartSign badge={badge} />
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
