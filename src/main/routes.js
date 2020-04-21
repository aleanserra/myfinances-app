import React from "react";

import Login from "../views/login";
import Home from "../views/home";
import About from "../views/about";
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
          console.log("if :", isUserAuthenticated);
          return <Component {...componentProps} />;
        } else {
          console.log("else", isUserAuthenticated);
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
  console.log("Props of router", props.isUserAuthenticated);
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register-users" component={RegisterUsers}></Route>
        <Route path="/about" component={About}></Route>

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
