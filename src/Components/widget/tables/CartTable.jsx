import React from "react";
import { CartDeleteModal } from "../modals/CartDeleteModal";

export const CartTable = ({ data, column }) => {
  return (
    <table className="table self-center">
      <thead>
        <tr>
          {column.map((col) => (
            <th
              key={col.key}
              className={`table--th ${col.width ? col.width : ""}`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row._id}
            className={index % 2 !== 0 ? "bg-gray-50" : "bg-white"}
          >
            {column.map((col) => (
              <td key={col.key} className="table--td ">
                {col.key === "thumbnail" ? (
                  <div className="flex justify-center">
                    <img
                      className="w-[100px]"
                      src={`http://localhost:8000/images/products/thumbnails/${row.thumbnail}`}
                      alt="thumbnail"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span>{row[col.key]}</span>
                  </div>
                )}
              </td>
            ))}
            <td className="table--td text-center">
              <CartDeleteModal data={row} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
