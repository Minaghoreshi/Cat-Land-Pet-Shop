import React, { useEffect, useState } from "react";
import { CustomBreadCrump } from "./CustomBreadCrump";
import Counter from "./Counter";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addOrder, user } from "../../../features/user/userSlice";
import { store } from "../../../store";

export const ProductDescript = ({
  product,
  name,
  category,
  subcategory,
  price,
  quantity,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product, selectedProduct, count]);
  const handleIncrement = () => {
    if (count < selectedProduct.quantity) {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    const newOrder = {
      _id: selectedProduct._id,
      count: count,
      price: selectedProduct.price,
      productName: selectedProduct.name,
      thumbnail: selectedProduct.thumbnail,
    };
    dispatch(addOrder(newOrder));
    const result = store.getState();
    console.log(result.user.userCart);
  };

  return selectedProduct ? (
    <div className="flex flex-col justify-between">
      <h1 className="text-primary text-3xl">{selectedProduct.name}</h1>{" "}
      <CustomBreadCrump
        category={selectedProduct.category.name}
        subcategory={selectedProduct.subcategory.name}
      />
      <span className="text-xl">{`${selectedProduct.price} تومان`}</span>{" "}
      <div className="flex gap-20 items-center ">
        <Counter
          max={selectedProduct.quantity}
          handleIncrement={handleIncrement}
          count={count}
          handleDecrement={handleDecrement}
        />
        <Button onClick={addToCart} size="xl">
          افزودن به سبد خرید
        </Button>
      </div>
    </div>
  ) : null;
};
