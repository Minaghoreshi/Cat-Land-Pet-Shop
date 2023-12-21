import React from "react";
import { Customcolumn } from "./custom-column";
export const OrdersTable = ({ data, columns, buttonsArray }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="table--th">
              {column.label}
            </th>
          ))}
          {/* <th className="py-4 px-4 border border-gray-300 font-semibold text-right"></th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 !== 0 ? "bg-gray-50" : "bg-white"}
          >
            {columns.map((column) => (
              <td key={column.key} className="table--td ">
                {column.key === "thumbnail" ? (
                  <div className="flex justify-center">
                    <img
                      className="w-[100px]"
                      src={`http://localhost:8000/images/products/thumbnails/${row.thumbnail}`}
                      alt="thumbnail"
                    />
                  </div>
                ) : column.key === "user" ? (
                  `${row.userFirstName} ${row.userLastName}`
                ) : column.key === "createdAt" ? (
                  <p>
                    {row[column.key] &&
                      new Intl.DateTimeFormat("fa-IR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        timeZone: "Asia/Tehran",
                      }).format(new Date(row[column.key]))}
                  </p>
                ) : (
                  row[column.key]
                )}
              </td>
            ))}
            <Customcolumn buttonsArray={buttonsArray} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};