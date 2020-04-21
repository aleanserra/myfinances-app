import React from "react";

import UserService from "../app/service/userService";
import { AuthContext } from "../main/authenticateProvider";

import currencyFormatter from "currency-formatter";
import { lang_pt } from "../languages/pt";
import { lang_en } from "../languages/en";
class Home extends React.Component {
  state = {
    balance: 0,
    lang: lang_en,
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
        <h1 className="display-5"> {this.state.lang.HOME_WELLCOME}</h1>
        <p className="lead"> {this.state.lang.HOME_FINANCE_SYSTEM} </p>
        <p className="lead">
          {this.state.lang.HOME_BALANCE}{" "}
          {currencyFormatter.format(this.state.balance, { locale: "pt-PT" })}
        </p>
        <hr className="my-4" />
        <p>{this.state.lang.HOME_INFO}</p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="#/register-users"
            role="button"
          >
            <i className="pi pi-users"> </i>{" "}
            {this.state.lang.HOME_REGISTER_USER_BUTTON}
          </a>
          <a
            className="btn btn-danger btn-lg"
            href="#/registerMoviments"
            role="button"
          >
            <i className="pi pi-money-bill"> </i>{" "}
            {this.state.lang.HOME_REGISTER_MOVIMENT_BUTTON}
          </a>
        </p>
      </div>
    );
  }
}

Home.contextType = AuthContext;

export default Home;
