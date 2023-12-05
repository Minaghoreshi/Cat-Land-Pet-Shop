import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="container-fluid min-h-screen  bg-secondary">{children}</div>
  );
};
