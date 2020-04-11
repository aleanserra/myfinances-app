import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import MovimentTable from "./movimentTable";

import MovimentService from "../../app/service/movimentService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from "../../components/toastr";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
class SearchMoviments extends React.Component {
  state = {
    year: "",
    month: "",
    type: "",
    showConfirmDialog: false,
    description: "",
    deleteMov: {},
    moviments: [],
  };

  constructor() {
    super();
    this.service = new MovimentService();
  }

  search = () => {
    if (!this.state.year) {
      messages.errorMessage("Please enter with year");
      return false;
    }

    const userLogged = LocalStorageService.getItem("_user_logged");

    const movimentFilter = {
      year: this.state.year,
      month: this.state.month,
      type: this.state.type,
      description: this.state.description,
      user: userLogged.id,
    };

    this.service
      .consult(movimentFilter)
      .then((response) => {
        const list = response.data;
        if (list.length < 1) {
          messages.alertMessage("No results");
        }
        this.setState({ moviments: list });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  edit = (id) => {
    this.props.history.push(`/registerMoviments/${id}`);
  };

  openConfirm = (moviment) => {
    this.setState({ showConfirmDialog: true, deleteMov: moviment });
    //console.log(this.state.deleteMov);
  };

  deleteCancel = () => {
    this.setState({ showConfirmDialog: false, deleteMov: {} });
  };

  deleteMoviment = () => {
    console.log(this.state.deleteMov.id);
    this.service
      .deleteMoviment(this.state.deleteMov.id)
      .then((response) => {
        const moviments = this.state.moviments;
        const index = moviments.indexOf(this.state.deleteMov);
        moviments.splice(index, 1);
        this.setState({ moviments: moviments, showConfirmDialog: false });
        messages.successMessage("Moviment delete success!");
      })
      .catch((error) => {
        messages.errorMessage("Moviment delete error");
      });
  };

  preperRegisterForm = () => {
    this.props.history.push("/registerMoviments");
  };

  changeStatus = (moviment, status) => {
    this.service.changeStatus(moviment.id, status).then((response) => {
      const moviments = this.state.moviments;
      const index = moviments.indexOf(moviment);
      if (index !== -1) {
        moviment["status"] = status;
        moviments[index] = moviment;
        this.setState({ moviments });
      }

      messages.successMessage("Update status with success.");
    });
  };

  render() {
    const months = this.service.getMonthList();
    const types = this.service.getTypeList();

    const confirmDialogFooter = (
      <div>
        <Button
          label="Confirm"
          icon="pi pi-check"
          onClick={this.deleteMoviment}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={this.deleteCancel}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <Card title="Search moviments">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputYear" label="Year: *">
                <input
                  type="text"
                  className="form-control"
                  id="inputYear"
                  value={this.state.year}
                  onChange={(e) => this.setState({ year: e.target.value })}
                  placeholder="Enter Year"
                />
              </FormGroup>

              <FormGroup htmlFor="inputMonth" label="Month: *">
                <SelectMenu
                  id="inputMonth"
                  value={this.state.month}
                  className="form-control"
                  onChange={(e) => this.setState({ month: e.target.value })}
                  list={months}
                />
              </FormGroup>

              <FormGroup htmlFor="inputType" label="Moviment type: *">
                <SelectMenu
                  id="inputType"
                  className="form-control"
                  value={this.state.type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                  list={types}
                />
              </FormGroup>

              <FormGroup htmlFor="inputDescription" label="Description: ">
                <input
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  placeholder="Enter Description"
                />
              </FormGroup>

              <button
                onClick={this.search}
                type="button"
                className="btn btn-success"
              >
                <i className="pi pi-search"></i> Search
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.preperRegisterForm}
              >
                <i className="pi pi-plus"></i> Register
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <MovimentTable
                moviments={this.state.moviments}
                deleteAction={this.openConfirm}
                editAction={this.edit}
                changeStatus={this.changeStatus}
              />
            </div>
          </div>
        </div>
        <div>
          <Dialog
            header="Confirm"
            visible={this.state.showConfirmDialog}
            style={{ width: "50vw" }}
            modal={true}
            footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            Delete moviment
          </Dialog>
        </div>
      </Card>
    );
  }
}

export default withRouter(SearchMoviments);
