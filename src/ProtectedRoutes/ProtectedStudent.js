import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedStudent = ({
  isAuth,
  component: Component,
  path: path,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedStudent;
