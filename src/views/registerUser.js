import React from "react";

import { withRouter } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import UserService from "../app/service/userService";
import { successMessage, errorMessage } from "../components/toastr";
import { AuthContext } from "../main/authenticateProvider";

class RegisterUsers extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  constructor() {
    super();
    this.service = new UserService();
  }

  save = () => {
    const { name, email, password, confirmPassword } = this.state;
    const user = { name, email, password, confirmPassword };

    try {
      this.service.validate(user);
    } catch (error) {
      const msgs = error.messages;
      msgs.forEach((msg) => errorMessage(msg));
      return false;
    }

    this.service
      .save(user)
      .then((response) => {
        successMessage("Success! Please log in.");
        this.props.history.push("/login");
      })
      .catch((error) => {
        errorMessage(error.response.data);
      });
  };

  cancel = () => {
    const isUserLogged = this.context.isAuthenticated;

    if (isUserLogged) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <Card title="Register user">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Name: *" htmlFor="inputName">
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  name="name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Password: *" htmlFor="inputPassword">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  name="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <FormGroup
                label="Confirm password: *"
                htmlFor="inputConfirmPassword"
              >
                <input
                  type="password"
                  id="inputConfirmPassword"
                  className="form-control"
                  name="password"
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
              </FormGroup>
              <button
                type="button"
                onClick={this.save}
                className="btn btn-success"
              >
                <i className="pi pi-save"></i>Save
              </button>
              <button
                onClick={this.cancel}
                type="button"
                className="btn btn-danger"
              >
                <i className="pi pi-times"></i>Cancel
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
RegisterUsers.contextType = AuthContext;
export default withRouter(RegisterUsers);
