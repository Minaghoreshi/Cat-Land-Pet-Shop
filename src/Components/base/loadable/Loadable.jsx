import { Loader } from "../loader/Loader";
import { Suspense } from "react";
import React from "react";

export const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
