import React from "react";
import currencyFormatter from "currency-formatter";

export default (props) => {
  const rows = props.moviments.map((moviment) => {
    return (
      <tr key={moviment.id}>
        <td>{moviment.description}</td>
        <td>{currencyFormatter.format(moviment.value, { locale: "pt-PT" })}</td>
        <td>{moviment.type}</td>
        <td>{moviment.month}</td>
        <td>{moviment.status}</td>
        <td>
          <button
            type="button"
            disabled={moviment.status !== "PENDING"}
            title="Effectuate"
            className="btn btn-success"
            onClick={(e) => props.changeStatus(moviment, "EFFECTIVED")}
          >
            <i className="pi pi-check"></i>
          </button>
          <button
            type="button"
            title="Cancel"
            disabled={moviment.status !== "PENDING"}
            className="btn btn-warning"
            onClick={(e) => props.changeStatus(moviment, "CANCELED")}
          >
            <i className="pi pi-times"></i>
          </button>
          <button
            type="button"
            title="Edit"
            className="btn btn-primary"
            onClick={(e) => props.editAction(moviment.id)}
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            type="button"
            title="Delete"
            className="btn btn-danger"
            onClick={(e) => props.deleteAction(moviment)}
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-rover">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Value</th>
          <th scope="col">Type</th>
          <th scope="col">Month</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
