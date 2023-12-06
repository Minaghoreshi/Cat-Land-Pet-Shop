import React from "react";

export const TableTitle = ({ button, title }) => {
  return (
    <div className="mt-5 flex justify-between items-center w-3/4">
      <span className="text-3xl ">{title} </span>
      <button className="bg-save text-white rounded-md font-thin py-2 px-4 shadow-2xl">
        {button}
      </button>
    </div>
  );
};
