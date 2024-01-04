import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategoryById } from "../../../api/category/category-api";
import { getProductsByCategory } from "../../../api/products/products-api";
import { CustomCard } from "../CustomCard";
import img from "../../../assets/hero.jpg";
import { Error } from "../error";
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
    return <Error />;
  }
  if (productsLoading) {
    return <p>Loading...</p>;
  }

  if (productsError) {
    return <Error />;
  }

  return (
    <div className="flex pb-6 flex-col gap-5 px-7 w-[1687px] ">
      <div className="relative flex gap-5 justify-center rounded-lg w-full h-72 items-end shadow-bt ">
        <img src={img} alt="Background" className="h-[200px]" />
        <h1 className="absolute top-10 font-bold text-[30px] text-primary ">
          {category}
        </h1>
      </div>
      <div className="flex flex-wrap gap-12 justify-start py-5 px-7 bg-secondary content-center rounded-lg">
        {products &&
          products.map((product) => (
            <CustomCard
              key={product._id}
              product={product}
              className={"border rounded-lg"}
            />
          ))}
      </div>
    </div>
  );
};

export default MainCategory;
