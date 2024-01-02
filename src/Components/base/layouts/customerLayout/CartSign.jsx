import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Badge } from "flowbite-react";

export const CartSign = ({ badge }) => {
  let navigate = useNavigate();

  return (
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
  );
};
