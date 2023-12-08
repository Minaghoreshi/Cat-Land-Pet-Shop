import React from "react";

export const TableButton = ({ button }) => {
  return (
    <button className="bg-save text-white rounded-md font-thin py-2 px-4 shadow-2xl">
      {button}
    </button>
  );
};
