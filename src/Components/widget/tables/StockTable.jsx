// Table.js
import React, { useEffect, useState } from "react";

import { EditableItem } from "./EditableItem";
import { Toastify } from "../../base/toast/Toastify";
export const StockTable = ({ columns, data, setDataToSend }) => {
  const [editedData, setEditedData] = useState([]);

  const update = (id, fieldName, valuForKey) => {
    setEditedData((prevData) => {
      const existingIndex = prevData.findIndex((item) => item.productId === id);

      if (existingIndex !== -1) {
        // If the product ID exists, update the existing entry
        const updatedData = [...prevData];
        updatedData[existingIndex][fieldName] = valuForKey;
        return updatedData;
      } else {
        // If the product ID doesn't exist, add a new entry with provided values
        const newData = {
          productId: id,
          [fieldName]: valuForKey,
        };
        return [...prevData, newData];
      }
    });
  };

  useEffect(() => {
    setDataToSend(editedData);
  }, [editedData, setDataToSend]);
  return (
    <table className="table">
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
        {data.map((item, index) => (
          <tr
            key={item._id}
            className={index % 2 !== 0 ? "bg-gray-50" : "bg-white"}
          >
            {columns.map((column) => {
              return (
                <td key={column.key} className="table--td">
                  {column.key === "price" || column.key === "quantity" ? (
                    <EditableItem
                      initialValue={item[column.key]}
                      productId={item._id}
                      fieldName={column.key}
                      update={update}
                      data={data}
                    />
                  ) : (
                    item[column.key]
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
