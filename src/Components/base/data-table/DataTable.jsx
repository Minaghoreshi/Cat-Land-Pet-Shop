import { Box, Button, Card, Table, Typography } from "@mui/material";
import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export function DataTable({ caption, button, columns = [], rows = [] }) {
  return (
    <Card sx={{ width: "100%", marginTop: 6.5 }}>
      <Box
        padding={3}
        paddingTop={4}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">{caption} </Typography>
        <Button variant="contained"> {button}</Button>
      </Box>
      <Table>
        <TableHead columns={columns} />
        <TableBody rows={rows} columns={columns} />
      </Table>
    </Card>
  );
}
