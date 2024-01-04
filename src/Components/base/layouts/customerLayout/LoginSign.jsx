import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const LoginSign = () => {
  return (
    <div className="flex flex-col relative gap-2 items-end">
      <div className="flex gap-2 items-end">
        {" "}
        <Icon icon="line-md:account" width="30" height="30" />
        <Link to={"/user-login"}>
          <span className="header--li">ورود / ثبت نام</span>
        </Link>
      </div>
    </div>
  );
};
