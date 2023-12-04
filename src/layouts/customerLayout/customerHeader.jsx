import {
  AppBar,
  Select,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const CustomerHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between", padding: 2 }}>
        <Box>
          {" "}
          <Typography variant="h1">کت لند</Typography>
        </Box>
        <Box display={"flex"} gap={6}>
          {" "}
          <Button href="/admin-login" variant="text">
            مدیریت
          </Button>
          <Button href="/cart" variant="text" startIcon={<ShoppingCartIcon />}>
            سبد خرید
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
