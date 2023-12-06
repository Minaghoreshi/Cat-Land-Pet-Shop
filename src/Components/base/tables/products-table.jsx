import React from "react";
import { Customcolumn } from "./custom-column";

const ProductsTable = ({ data, columns, buttonsArray }) => {
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
          <tr key={rowIndex} className={"bg-gray-50"}>
            {columns.map((column) => (
              <td key={column.key} className="table--td ">
                {row[column.key]}
              </td>
            ))}
            <Customcolumn buttonsArray={buttonsArray} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
