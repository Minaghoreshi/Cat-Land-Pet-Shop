import React from "react";
import { Container } from "../container";
import { UserLoginForm } from "../../login";

export const UserLoginLayout = () => {
  return (
    <Container className="flex justify-center items-center">
      <UserLoginForm />
    </Container>
  );
};
