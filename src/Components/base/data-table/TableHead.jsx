import { TableCell, TableHead as MuiTableHead, TableRow } from "@mui/material";
import React from "react";
function TableHead({ columns = [] }) {
  return (
    <MuiTableHead>
      <TableRow
        sx={{
          backgroundColor: "neutral.100",
        }}
      >
        {columns.map((col) => (
          <TableCell
            sx={{
              textTransform: "uppercase",
            }}
            key={col.id}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
