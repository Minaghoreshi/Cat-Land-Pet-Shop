import React from "react";
import { Container } from "../container";
import { LoginForm } from "../../..";
export function LoginLayout({ shouldNavigate }) {
  return (
    <Container className="flex justify-center items-center">
      <LoginForm shouldNavigate={shouldNavigate} />
    </Container>
  );
}
