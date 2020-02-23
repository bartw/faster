import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "./firebase";

const ProtectedRoute = props => {
  const user = useUser();
  return user ? <Route {...props} /> : <Redirect to="/log-in" />;
};

export default ProtectedRoute;
