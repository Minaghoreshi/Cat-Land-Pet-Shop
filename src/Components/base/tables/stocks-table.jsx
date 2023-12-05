import React from "react";

const StocksTable = ({ data, columns }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key}
              className={`table--th ${index === 0 ? "w-3/5" : "w-1/5"} `}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={"bg-gray-50"}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`table--td ${
                  column.key === "price" || column.key === "quantity"
                    ? "editable"
                    : ""
                }`}
              >
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StocksTable;
