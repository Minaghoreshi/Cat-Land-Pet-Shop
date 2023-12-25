import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProductsBySubcategory } from "../../../api/products/products-api";
import { CustomCard } from "../CustomCard";
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
  // return <div>{subCategoryData}</div>;
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
    <div className="flex pb-6 flex-col gap-5 px-9 max-w-screen-2xl max-height:700px overflow-auto custom-scroll">
      <h1 className="font-bold text-[30px] text-primary hover:underline underline-offset-8 hover:text-selected">
        {subCategory}
      </h1>{" "}
      <div>
        {products.length > 0 ? (
          <div className="flex flex-wrap gap-10">
            {products.map((product) => (
              <CustomCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <span className="text-selected text-3xl">
            در حال حاضر محصولی در این زیر مجموعه موجود نیست
          </span>
        )}
      </div>
    </div>
  );
};
