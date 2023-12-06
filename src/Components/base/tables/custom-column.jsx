import React from "react";

export const Customcolumn = ({ buttonsArray }) => {
  // Handle the case where buttonsArray is not an array
  if (!Array.isArray(buttonsArray)) {
    return null;
  }
  return (
    <td className="py-4 px-4 border-t border-gray-300 flex justify-center">
      {buttonsArray.map((btn, index) => (
        <>
          <button
            className={`hover:underline ${
              index % 2 === 0 ? "text-blue-600" : "text-selected"
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
