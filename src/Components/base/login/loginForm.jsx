import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export const LoginForm = () => {
  return (
    <form>
      <Box
        sx={{
          boxShadow: 3,
          width: 600,
          padding: 10,

          borderRadius: `30px`,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          alignItems: "space-around",
        }}
      >
        <Typography
          variant="h1"
          sx={{ alignSelf: "center" }}
          color="primary.main"
        >
          پنل مدیریت کت لند
        </Typography>
        <TextField
          // id="outlined-password-input"
          label="نام کاربری"
          type="email"
          autoComplete="current-password"
        />{" "}
        <TextField
          id="outlined-password-input"
          label="رمز عبور"
          type="email"
          autoComplete="current-password"
        />{" "}
        <Button
          href="/admin-panel"
          variant="contained"
          sx={{
            width: 100,
            alignSelf: "center",
            backgroundColor: "success.main",
          }}
        >
          ورود
        </Button>
        <Button sx={{ color: "primary.x" }}>بازگشت به سایت</Button>
      </Box>
    </form>
  );
};
