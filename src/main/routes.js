import React from "react";

import Login from "../views/login";
import Home from "../views/home";
import RegisterUsers from "../views/registerUser";
import SearchMoviments from "../views/moviments/searchMoviments";
import RegisterMoviments from "../views/moviments/registerMoviments";

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import { AuthConsumer } from "../main/authenticateProvider";

function RouteAuthenticated({
  component: Component,
  isUserAuthenticated,
  ...props
}) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUserAuthenticated) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function Routes(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register-users" component={RegisterUsers}></Route>

        <RouteAuthenticated
          isUserAuthenticated={props.isUserAuthenticated}
          path="/home"
          component={Home}
        ></RouteAuthenticated>
        <RouteAuthenticated
          isUserAuthenticated={props.isUserAuthenticated}
          path="/searchMoviments"
          component={SearchMoviments}
        ></RouteAuthenticated>
        <RouteAuthenticated
          isUserAuthenticated={props.isUserAuthenticated}
          path="/registerMoviments/:id?"
          component={RegisterMoviments}
        ></RouteAuthenticated>
      </Switch>
    </HashRouter>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => <Routes isUserAuthenticated={context.isAuthenticated} />}
  </AuthConsumer>
);
