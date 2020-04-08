import React from "react";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import MovimentService from "../../app/service/movimentService";
import SelectMenu from "../../components/selectMenu";
import * as messages from "../../components/toastr";
import LocalStorageService from "../../app/service/localstorageService";

class RegisterMoviments extends React.Component {
  state = {
    id: null,
    description: "",
    value: "",
    month: "",
    year: "",
    type: "",
    status: "",
  };

  constructor() {
    super();
    this.service = new MovimentService();
  }

  componentDidMount() {
    const params = this.props.match.params;

    console.log("params : ", params);
  }

  submit = () => {
    const currentUser = LocalStorageService.getItem("_user_logged");
    const { description, value, month, year, type } = this.state;
    const moviment = {
      description,
      value,
      month,
      year,
      type,
      user: currentUser.id,
    };

    this.service
      .save(moviment)
      .then((response) => {
        this.props.history.push("/searchMoviments");
        messages.successMessage("Moviment registred with success!");
      })
      .catch((error) => {
        messages.errorMessage(error.response.data);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    const types = this.service.getTypeList();
    const months = this.service.getMonthList();

    return (
      <Card title="Register moviment">
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="description" label="Description: *">
              <input
                id="description"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="year" label="Year: *">
              <input
                id="year"
                type="text"
                name="year"
                value={this.state.year}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="month" label="Month: *">
              <SelectMenu
                id="month"
                className="form-control"
                name="month"
                value={this.state.month}
                onChange={this.handleChange}
                list={months}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="value" label="Value: *">
              <input
                id="value"
                type="text"
                name="value"
                value={this.state.value}
                onChange={this.handleChange}
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="type" label="Type: *">
              <SelectMenu
                id="type"
                className="form-control"
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
                list={types}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup id="status" label="Status: *">
              <input
                type="text"
                className="form-control"
                name="status"
                value={this.state.status}
                disabled
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-success"
              onClick={this.submit}
              type="button"
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => this.props.history.push("/searchMoviments")}
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(RegisterMoviments);
