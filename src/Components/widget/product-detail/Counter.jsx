import { Button } from "flowbite-react";
import React, { useState } from "react";

export const Counter = ({ initialValue = 1, min = 0, max, onChange }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + 1);
      onChange && onChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      setCount(count - 1);
      onChange && onChange(count - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center shadow-custom ">
      <Button
        disabled={max === 0 ? true : false}
        pill
        onClick={handleDecrement}
        className="w-[45px] h-[45px]"
      >
        -
      </Button>
      <span className="text-lg text-2xl">{max === 0 ? 0 : count}</span>
      <Button
        disabled={max === 0 ? true : false}
        pill
        onClick={handleIncrement}
        className="w-[45px] h-[45px]"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
