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
    <div className="flex flex-col pb-6 gap-5 px-9  no-scrollbar max-height: 700px overflow-auto custom-scroll max-w-full">
      {menuItems.map((item, index) => (
        <div className="flex  p-5 items-center  bg-secondary rounded-lg">
          <div className="w-[220px] h-[270px] flex justify-between flex-col items-center">
            <h1 className="font-bold text-[21px] text-primary hover:underline underline-offset-8 hover:text-selected">
              {item.name}
            </h1>
            <img
              className="w-[170px] h-[200px] rounded-lg"
              src={imagesArray[index % imagesArray.length]}
              alt=""
            />
            <Link to={`/category/${item._id}`}>
              <div className="flex gap-1 items-center">
                <span className="text-primary">مشاهده همه</span>
                <Icon icon="icons8:left-round" width="30" height="30" />
              </div>
            </Link>
          </div>

          <CategorySection item={item} key={item._id} />
        </div>
      ))}
    </div>
  ) : null;
};
