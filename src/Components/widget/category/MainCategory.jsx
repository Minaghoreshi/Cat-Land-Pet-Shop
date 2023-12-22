import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategoryById } from "../../../api/category/category-api";
import { getProductsByCategory } from "../../../api/products/products-api";
import { CustomCard } from "../CustomCard";
export const MainCategory = ({ categoryId }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery(["category", categoryId], () => {
    return getCategoryById(categoryId);
  });
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery(["products", categoryId], () => {
    return getProductsByCategory(categoryId);
  });
  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
    if (productsData) {
      setProducts(productsData);
    }
  }, [categoryData, productsData]);

  console.log(products);
  if (categoryLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError) {
    console.error("Error fetching data:", categoryError);
    return <p>Error fetching data</p>;
  }
  if (productsLoading) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    console.error("Error fetching data:", categoryError);
    return <p>Error fetching data</p>;
  }
  return (
    <div className="flex pb-6 flex-col gap-5 px-9 max-w-screen-2xl max-height:700px overflow-auto custom-scroll">
      <h1 className="font-bold text-[30px] text-primary hover:underline underline-offset-8 hover:text-selected">
        {category}
      </h1>{" "}
      <div className="flex flex-wrap gap-10">
        {products &&
          products.map((product) => (
            <CustomCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default MainCategory;
