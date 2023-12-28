import React from "react";
import { Link } from "react-router-dom";

export const ModalTable = ({
  columns,
  product,
  totalPrice,
  count,
  productId,
}) => {
  console.log(productId);
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
          <Link to={`/product/${productId}`}>
            <td className="table--td">{product}</td>{" "}
          </Link>
          <td className="table--td">{totalPrice}</td>{" "}
          <td className="table--td">{count}</td>
        </tr>
      </tbody>
    </table>
  );
};
