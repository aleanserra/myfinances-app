import React from "react";

import Login from "../views/login";
import Home from "../views/home";
import AuthService from "../app/service/authService";
import RegisterUsers from "../views/registerUser";
import SearchMoviments from "../views/moviments/searchMoviments";
import RegisterMoviments from "../views/moviments/registerMoviments";

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

function RouteAuthenticated({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (AuthService.isUserAuthenticated()) {
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

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register-users" component={RegisterUsers}></Route>

        <RouteAuthenticated path="/home" component={Home}></RouteAuthenticated>
        <RouteAuthenticated
          path="/searchMoviments"
          component={SearchMoviments}
        ></RouteAuthenticated>
        <RouteAuthenticated
          path="/registerMoviments/:id?"
          component={RegisterMoviments}
        ></RouteAuthenticated>
      </Switch>
    </HashRouter>
  );
}

export default Routes;
