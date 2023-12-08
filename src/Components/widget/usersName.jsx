import React from "react";
import { getUser } from "../../api/users/users-api";
import { useQuery } from "react-query";
import axios from "axios";
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA1M2QwNmU5ZmY3MTY0ZjEzOWQ1NiIsImlhdCI6MTcwMTk2OTA2OCwiZXhwIjoxNzAxOTcwODY4fQ.5HR0DO2d0-zP4_Kmj3ez1V0U1nG1DUqm4_syxPvAlqM`;

export const UsersName = ({ userId }) => {
  const { data, error, isLoading } = useQuery(["user", userId], () => {
    return getUser(userId).then((res) => res);
  });

  return <div>{`${data?.firstname} ${data?.lastname}`}</div>;
};
