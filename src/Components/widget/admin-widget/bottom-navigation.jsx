import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export const BottomNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <Box>
      {" "}
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   console.log(newValue);
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction
          onClick={() => {
            navigate("/products-table");
          }}
          label="کالاها"
        />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction
          onClick={() => {
            navigate("/stocks-table");
          }}
          label="موجودی و قیمت"
        />
        <Divider orientation="vertical" flexItem />
        <BottomNavigationAction
          onClick={() => {
            navigate("/orders-table");
          }}
          label="سفارش ها"
        />
      </BottomNavigation>
    </Box>
  );
};
