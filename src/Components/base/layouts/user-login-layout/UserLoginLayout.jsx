import React from "react";
import { Container } from "../container";
import { UserForm } from "../../../widget";

export const UserLoginLayout = () => {
  return (
    <>
      <Container className="flex justify-center items-center flex-col">
        <UserForm />
      </Container>
    </>
  );
};
