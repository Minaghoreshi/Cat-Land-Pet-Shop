import React from "react";

export const Container = ({ children, className }) => {
  const originContainerClasses = "container-fluid min-h-screen";
  const combinedClasses = `${originContainerClasses} ${className}`;
  return <div className={combinedClasses}>{children}</div>;
};
