import React from "react";
import { Link } from "react-router-dom";

export const ModalTable = ({
  columns,
  product,
  totalPrice,
  count,
  productId,
}) => {
  if (!productId) {
    return null; // or return an alternative component, message, etc.
  }

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
          <td className="table--td">
            <Link to={`/product/${productId}`}>{product}</Link>
          </td>
          <td className="table--td">{totalPrice}</td>
          <td className="table--td">{count}</td>
        </tr>
      </tbody>
    </table>
  );
};
