import React from "react";
import { Link } from "react-router-dom";
import { THead } from "../table-parts";
export const ModalTable = ({ columns, data }) => {
  console.log(data);
  return (
    <table className="ModalTable">
      <THead column={columns} />
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id}
            className={index % 2 !== 0 ? "bg-gray-50" : "bg-white"}
          >
            {columns.map((col) => (
              <td key={col.key} className="table--td ">
                {col.key === "thumbnail" ? (
                  <Link to={`/product/${row.id}`}>
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
                    <Link to={`/product/${row.id}`}>
                      <span className="hover:underline hover:text-selected">
                        {row[col.key]}
                      </span>{" "}
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span>{row[col.key]}</span>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
