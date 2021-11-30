import React from "react";
import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../IsAuth/IsAuthContext";

interface ProtectedRouteContext {
  Component?: any;
}

function ProtectedRoute({
  Component,
  ...rest
}: ProtectedRouteContext): JSX.Element {
  // const { isAuth } = useAuth();
  let localstorage = localStorage.getItem("UserData");

  return (
    <Route
    // {...rest}
    // render={() => {
    //   if (!localstorage) {
    //     return <Component />;
    //   } else {
    //     return <Navigate to="/" />;
    //   }
    // }}
    />
  );
}

export default ProtectedRoute;
