import React from "react";

export const Customcolumn = ({ buttonsArray }) => {
  // Handle the case where buttonsArray is not an array
  if (!Array.isArray(buttonsArray)) {
    return null;
  }
  return (
    <td className="py-4 px-4 border border-gray-300 ">
      {buttonsArray.map((btn, index) => (
        <>
          <button
            className={`hover:underline ${
              index % 2 === 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            {btn}
          </button>
          {index < buttonsArray.length - 1 && "/"}
        </>
      ))}
    </td>
  );
};
