import React from "react";

export const ModalTable = ({ columns, product, totalPrice, count }) => {
  console.log(product);
  return (
    <table className="ModalTable">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key}
              className={`table--th ${column.width ? column.width : ""}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table--td">{product}</td>{" "}
          <td className="table--td">{totalPrice}</td>{" "}
          <td className="table--td">{count}</td>
        </tr>
      </tbody>
    </table>
  );
};
