import React from "react";

import UserService from "../app/service/userService";
import { AuthContext } from "../main/authenticateProvider";

import currencyFormatter from "currency-formatter";
class Home extends React.Component {
  state = {
    balance: 0,
  };

  constructor() {
    super();
    this.userService = new UserService();
  }

  componentDidMount() {
    const userLogged = this.context.userAuthenticated;

    console.log(userLogged);

    this.userService
      .getBalanceByUser(userLogged.id)
      .then((response) => {
        this.setState({
          balance: response.data,
        });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-5"> Welcome! </h1>
        <p className="lead"> This is your finance system. </p>
        <p className="lead">
          Your balance for the current month is{" "}
          {currencyFormatter.format(this.state.balance, { locale: "pt-PT" })}
        </p>
        <hr className="my-4" />
        <p>
          And this is your administrative area, use one of the menus or buttons
          below to browse the system.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="#/register-users"
            role="button"
          >
            <i className="pi pi-users"> </i> Register user
          </a>
          <a
            className="btn btn-danger btn-lg"
            href="#/registerMoviments"
            role="button"
          >
            <i className="pi pi-money-bill"> </i> Register moviment
          </a>
        </p>
      </div>
    );
  }
}

Home.contextType = AuthContext;

export default Home;
