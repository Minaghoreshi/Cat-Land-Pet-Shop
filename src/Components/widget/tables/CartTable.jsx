import React from "react";
import { CartDeleteModal } from "../modals/CartDeleteModal";
import { Link } from "react-router-dom";

export const CartTable = ({ data, column }) => {
  return (
    <table className="table self-center min-w-full">
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
                  <Link to={`/product/${row._id}`}>
                    <div className="flex justify-center">
                      <img
                        className="w-[100px]"
                        src={`http://localhost:8000/images/products/thumbnails/${row.thumbnail}`}
                        alt="thumbnail"
                      />
                    </div>{" "}
                  </Link>
                ) : col.key === "name" ? (
                  <div className="flex justify-center">
                    {" "}
                    <Link to={`/product/${row._id}`}>
                      <span className="hover:underline hover:text-selected">
                        {row[col.key]}
                      </span>{" "}
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span>{row[col.key].toLocaleString("en-US")}</span>
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
