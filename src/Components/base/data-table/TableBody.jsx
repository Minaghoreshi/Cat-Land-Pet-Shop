import React from "react";

import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";
function TableBody({ rows = [], columns = [] }) {
  return (
    <MuiTableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          {columns.map((col) => (
            <TableCell key={`${row.id}-${col.id}`}>
              {col.renderCol(row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
}

export default TableBody;
