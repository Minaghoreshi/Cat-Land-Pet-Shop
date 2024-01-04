import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../api/category/category-api";
import { useQuery } from "react-query";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { getProductsByCategory } from "../../../api/products/products-api";
export const CategoryNav = ({ classname, onMouseEnter, onMouseLeave }) => {
  const [menuItems, setMenuItems] = useState([]);
  console.log(menuItems);
  const {
    data: category,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery(["test"], getAllCategories);
  const fetchSubCategories = async () => {
    if (category) {
      const promises = category.map(async (category) => {
        try {
          const res = await getSubCategoryByCategoryId(category._id);
          return {
            name: category.name,
            _id: category._id,
            isOpen: false,
            subCategories: res,
          };
        } catch (error) {
          console.log(error);
          return {
            name: category.name,
            _id: category._id,
            isOpen: false,
            subCategories: [],
          };
        }
      });

      const resolvedMenuItems = await Promise.all(promises);
      setMenuItems(resolvedMenuItems);
    }
  };
  const fetchProductsForCategories = async () => {
    if (category) {
      const productPromises = category.map(async (category) => {
        try {
          const productsRes = await getProductsByCategory(category._id);
          return { categoryId: category._id, products: productsRes };
        } catch (error) {
          console.log(error);
          return { categoryId: category._id, products: [] };
        }
      });

      const resolvedProducts = await Promise.all(productPromises);
      setMenuItems((prevItems) =>
        prevItems.map((item) => {
          const matchingProductItem = resolvedProducts.find(
            (productItem) => productItem.categoryId === item._id
          );
          return matchingProductItem
            ? { ...item, products: matchingProductItem.products }
            : item;
        })
      );
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchProductsForCategories();
  }, [category]);
  if (categoryLoading) {
    return <p>Loading...</p>;
  }

  if (categoryError) {
    console.error("Error fetching data:", categoryError);
    return <p>Error fetching data</p>;
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` flex rounded-br-lg rounded-bl-lg border border-t-0 gap-6 bg-white z-10 ${classname} bg-transparent w-2/3 justify-between p-7`}
    >
      {menuItems.map((category) => (
        <div key={category._id} className="flex flex-col gap-3">
          <Link to={`/category/${category._id}`}>
            <h4 className="text-black hover:text-selected">{category.name}</h4>
          </Link>
          <ul className="pr-2">
            {category.subCategories.map((sub) => (
              <Link to={`/SubCategory/${sub._id}`} key={sub._id}>
                <li
                  key={sub._id}
                  className="text-gray-400 hover:text-selected mb-3"
                >
                  {sub.name}{" "}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
