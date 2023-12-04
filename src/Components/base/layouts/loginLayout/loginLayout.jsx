import React from "react";
import { LoginForm } from "../../../widget/login";
import { Container } from "@mui/material";
export function LoginLayout() {
  return (
    <Container sx={{ padding: 0 }}>
      <LoginForm />
    </Container>
  );
}
