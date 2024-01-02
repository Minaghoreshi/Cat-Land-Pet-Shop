import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/9005223.jpg";
import { Badge } from "flowbite-react";
import { useSelector } from "react-redux";

export const CustomerHeader = () => {
  const badge = useSelector((state) => state.user.badge);
  let navigate = useNavigate();

  return (
    <header className="flex px-9 py-5 bg-primary  text-secondary items-center justify-between w-full">
      <h1 className=" font-bold text-[60px] ">کت لند</h1>
      <div>
        <img
          onClick={() => {
            navigate("/");
          }}
          className="w-24 h-24 cursor-pointer"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="flex gap-8 justify-self-end text-2xl">
        <button
          onClick={() => {
            navigate("/admin-login");
          }}
        >
          {" "}
          مدیریت
        </button>
        <div className="relative">
          <button
            onClick={() => {
              navigate("/cart");
            }}
            className="flex items-center gap-2"
          >
            <Icon icon="mdi:cart-outline" color="white" />
            سبد خرید
          </button>
          {badge > 0 ? (
            <Badge
              className="absolute top-[-1.8rem] left-0 text-base rounded"
              color="gray"
            >
              {" "}
              {badge}
            </Badge>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};
