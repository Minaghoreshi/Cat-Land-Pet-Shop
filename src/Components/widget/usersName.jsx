import React from "react";
import { getUser } from "../../api/users/users-api";
import { useQuery } from "react-query";
export const UsersName = ({ userId }) => {
  const { data, error, isLoading } = useQuery(["user", userId], () =>
    getUser(userId)
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }

  return <div>{`${data.firstname} ${data.lastname}`}</div>;
};
