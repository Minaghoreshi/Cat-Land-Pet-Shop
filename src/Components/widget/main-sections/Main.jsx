import React from "react";
import { ProductsSection } from "./ProductsSection";
import { HomeSidebar } from "./sideBar/HomeSidebar";
export const Main = () => {
  return (
    <div className="flex pt-8 gap-16">
      <HomeSidebar>this is nav</HomeSidebar>
      <ProductsSection></ProductsSection>
    </div>
  );
};
