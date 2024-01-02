import React from "react";
import { Link } from "react-router-dom";
import { THead } from "../table-parts";
export const ModalTable = ({
  columns,
  product,
  totalPrice,
  count,
  productId,
}) => {
  if (!productId) {
    return null;
  }

  return (
    <table className="ModalTable">
      <THead column={columns} />
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
