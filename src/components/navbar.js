import React from "react";

import NavbarItem from "./navbarItem";
import AuthService from "../app/service/authService";

const logout = () => {
  AuthService.removeUserAuthenticated();
};

const isUserAuthenticated = () => {
  return AuthService.isUserAuthenticated();
};

function Navbar() {
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="https://bootswatch.com/" className="navbar-brand">
          My finances
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem
              render={isUserAuthenticated()}
              href="#/home"
              label="Home"
            />
            <NavbarItem
              render={isUserAuthenticated()}
              href="#/register-users"
              label="Users"
            />
            <NavbarItem
              render={isUserAuthenticated()}
              href="#/searchMoviments"
              label="Moviments"
            />
            <NavbarItem
              render={isUserAuthenticated()}
              onClick={logout}
              href="#/login"
              label="Logout"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
