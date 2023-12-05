import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Box,
} from "@mui/material";
export const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Box>
      {" "}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction href="/products-table" label="کالاها" />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction label="موجودی و قیمت" />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction label="سفارش ها" />
      </BottomNavigation>
    </Box>
  );
};
