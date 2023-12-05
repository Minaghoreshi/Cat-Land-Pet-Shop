import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { BottomNav } from "../../../widget/admin-widget";

export const AdminHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between", padding: 2 }}>
        <Box>
          {" "}
          <Typography variant="h1" color={"white"}>
            پنل مدیریت کت لند
          </Typography>
        </Box>
        <Box display={"flex"} gap={10}>
          {" "}
          <BottomNav />
          <Button sx={{ color: "primary.x" }} href="/" variant="text">
            بازگشت به سایت
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
