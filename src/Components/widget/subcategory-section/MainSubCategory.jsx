import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProductsBySubcategory } from "../../../api/products/products-api";
import { CustomCard } from "../CustomCard";
import img from "../../../assets/hero.jpg";

import { getSubCategoryById } from "../../../api/subcategory/subcategory-api";
export const MainSubCategory = ({ sub }) => {
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const {
    data: subCategoryData,
    error: subCategoryError,
    isLoading: subCategoryoading,
  } = useQuery(["category", sub], () => {
    return getSubCategoryById(sub);
  });
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery(["products", subCategory], () => {
    return getProductsBySubcategory(sub);
  });
  useEffect(() => {
    if (subCategoryData) {
      setSubCategory(subCategoryData);
    }
    if (productsData) {
      setProducts(productsData);
    }
  }, [subCategoryData, productsData]);

  if (subCategoryoading) {
    return <p>Loading...</p>;
  }

  if (subCategoryError) {
    console.error("Error fetching data:", subCategoryError);
    return <p>Error fetching data</p>;
  }
  if (productsLoading) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    console.error("Error fetching data:", subCategoryError);
    return <p>Error fetching data</p>;
  }
  return (
    <div className="flex pb-6 flex-col gap-5 px-7 w-[1687px] ">
      {" "}
      <div className="relative flex gap-5 justify-center rounded-lg w-full h-72 items-end shadow-bt ">
        <img src={img} alt="Background" className="h-[200px]" />
        <h1 className="absolute top-10 font-bold text-[30px] text-primary ">
          {subCategory}
        </h1>{" "}
      </div>
      <div>
        {products.length > 0 ? (
          <div className="flex flex-wrap gap-12 justify-start py-5 px-7 bg-secondary content-center rounded-lg">
            {products.map((product) => (
              <CustomCard
                key={product._id}
                product={product}
                className={"border rounded-lg"}
              />
            ))}
          </div>
        ) : (
          <span className="text-primary text-3xl">
            در حال حاضر محصولی در این زیر مجموعه موجود نیست
          </span>
        )}
      </div>
    </div>
  );
};
