import React, { useEffect, useState } from "react";
import { CustomBreadCrump } from "./CustomBreadCrump";
import Counter from "./Counter";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addOrder, updateBadge } from "../../../features/user/userSlice";
import { store } from "../../../store";
import { Toastify } from "../../base";

export const ProductDescript = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [toastifyVisible, setToastifyVisible] = useState(false);
  const [toastColor, setToastColor] = useState("");
  const [toastText, setToastText] = useState("");
  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
    const state = store.getState();
    const oldOrders = state.user.userCart;
    console.log(oldOrders);
    if (selectedProduct) {
      const existingProductIndex = oldOrders.findIndex(
        (order) => order._id === selectedProduct._id
      );
      if (existingProductIndex !== -1) {
        const existingProduct = oldOrders[existingProductIndex];
        setCount(existingProduct.count);
      }
    }
  }, [product, selectedProduct]);
  useEffect(() => {
    if (toastifyVisible) {
      const timeOutId = setTimeout(() => {
        setToastifyVisible(false);
      }, 3100);
      return () => clearTimeout(timeOutId);
    }
  }, [toastifyVisible]);
  const handleIncrement = () => {
    if (count < selectedProduct.quantity) {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    if (count > 0) {
      const newOrder = {
        _id: selectedProduct._id,
        count: count,
        price: selectedProduct.price,
        name: selectedProduct.name,
        thumbnail: selectedProduct.thumbnail,
      };
      dispatch(addOrder(newOrder));
      setToastText("محصول به سبد خرید اضافه شد");
      setToastColor("bg-success");
      setToastifyVisible((prev) => !prev);

      dispatch(updateBadge());
      const result = store.getState();
      console.log(result.user.userCart);
    } else {
      setToastText("تعداد محصول را انتخاب کنید");
      setToastColor("bg-selected");
      setToastifyVisible((prev) => !prev);
    }
  };

  return (
    <>
      {toastifyVisible && (
        <Toastify text={toastText} color={toastColor} position={"left-10"} />
      )}
      {selectedProduct ? (
        <div className="flex flex-col justify-between">
          <h1 className="text-primary text-3xl">{selectedProduct.name}</h1>{" "}
          <CustomBreadCrump
            category={selectedProduct.category.name}
            subcategory={selectedProduct.subcategory.name}
          />
          <span className="text-xl">{`${selectedProduct.price.toLocaleString(
            "en-US"
          )} تومان`}</span>{" "}
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
      ) : null}
    </>
  );
};
