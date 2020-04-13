import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";
import UserService from "../app/service/userService";
import LocalStorageService from "../app/service/localstorageService";
import { errorMessage } from "../components/toastr";
import { AuthContext } from "../main/authenticateProvider";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  constructor() {
    super();
    this.service = new UserService();
  }

  enter = async () => {
    this.service
      .authenticate({
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.context.startSession(response.data);
        this.props.history.push("/home");
      })
      .catch((error) => {
        errorMessage(error.response.data);
      });
  };

  preparRegister = () => {
    this.props.history.push("/register-users");
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-md-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email: *" htmlFor="exempleInputEmail1">
                        <input
                          type="email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email"
                        />
                      </FormGroup>
                      <FormGroup
                        label="Password: *"
                        htmlFor="exampleInputPassword1"
                      >
                        <input
                          type="password"
                          value={this.state.password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </FormGroup>
                      <button onClick={this.enter} className="btn btn-success">
                        <i className="pi pi-sign-in"></i>Sign in
                      </button>
                      <button
                        onClick={this.preparRegister}
                        className="btn btn-danger"
                      >
                        <i className="pi pi-plus"></i>Sign up
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
