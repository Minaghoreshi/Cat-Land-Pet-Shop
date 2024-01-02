import React from "react";

export const THead = ({ column }) => {
  return (
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
  );
};
