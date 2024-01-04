import React from "react";
import { Icon } from "@iconify/react";

import img1 from "../../../../assets/cat1.jpeg";
import img2 from "../../../../assets/cat2.jpg";
import img3 from "../../../../assets/cat3.jpg";
import img4 from "../../../../assets/cat4.jpeg";
import { CategorySection } from "./CategorySection";
import { Link } from "react-router-dom";
const imagesArray = [img1, img2, img3, img4];
export const ProductsSection = ({ menuItems }) => {
  console.log(menuItems);
  return menuItems ? (
    <div className="flex flex-col gap-5 px-9 pb-10  max-w-full relative">
      {menuItems.map((item, index) => (
        <div
          key={item._id}
          className="flex  p-5 items-center  bg-secondary rounded-lg  w-auto "
        >
          <div className="min-w-[220px] h-[270px] flex justify-between flex-col items-center ">
            <h1 className="font-bold text-[21px] text-primary">{item.name}</h1>
            <img
              className="w-[170px] h-[200px] rounded-lg"
              src={imagesArray[index % imagesArray.length]}
              alt=""
            />
            <Link to={`/category/${item._id}`}>
              <div className="flex gap-1 items-center">
                <span className="text-primary">مشاهده همه</span>
                <Icon
                  icon="icons8:left-round"
                  width="30"
                  height="30"
                  color="#406f76"
                />
              </div>
            </Link>
          </div>

          <CategorySection item={item} key={item._id} />
        </div>
      ))}
    </div>
  ) : null;
};
