import React from "react";
import { Icon } from "@iconify/react";

export const LogOutSign = ({ handleLogOut }) => {
  return (
    <div className="flex flex-col relative gap-2 items-end w-[126px]">
      <div className="flex gap-2 items-end">
        {" "}
        <Icon icon="line-md:account-delete" width="30" height="30" />
        <span onClick={handleLogOut} className="header--li">
          {" "}
          خروج
        </span>
      </div>
    </div>
  );
};
