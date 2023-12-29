import { Button } from "flowbite-react";
import React, { useState } from "react";

export const Counter = ({ max, handleIncrement, count, handleDecrement }) => {
  return (
    <div className="flex gap-4 justify-center items-center shadow-custom ">
      <Button
        disabled={max === 0 ? true : false}
        pill
        onClick={handleDecrement}
        className="w-[45px] h-[45px]"
        size="xl"
      >
        -
      </Button>
      <span className="text-2xl">{max === 0 ? 0 : count}</span>
      <Button
        disabled={max === 0 || count === max ? true : false}
        pill
        onClick={handleIncrement}
        className="w-[45px] h-[45px] text-4xl"
        size="xl"
        label
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
