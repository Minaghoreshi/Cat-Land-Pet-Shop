import React from "react";
import { Container } from "../container";
import { UserForm } from "../../../widget";
import { Flip, ToastContainer, toast } from "react-toastify";

export const UserLoginLayout = () => {
  return (
    <>
      <Container className="flex justify-center items-center flex-col">
        {" "}
        <UserForm />
      </Container>
    </>
  );
};
