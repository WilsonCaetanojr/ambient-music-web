import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { user } = useContext(UserContext);

  const redirecionar = props => {
    if (user && user.Token) {
      return Component ? <Component {...props} /> : render(props);
    }

    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={props => redirecionar(props)} />;
};

export default ProtectedRoute;
