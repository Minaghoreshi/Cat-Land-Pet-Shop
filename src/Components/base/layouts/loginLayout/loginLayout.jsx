import React from "react";
import { LoginForm } from "../../login";
import { Container } from "@mui/material";
export function LoginLayout() {
  return (
    <Container
      sx={{ padding: `150px 0 0 0`, justifyContent: "center", display: "flex" }}
    >
      <LoginForm />
    </Container>
  );
}
