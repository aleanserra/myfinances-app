import ApiService from "../apiservice";
import ErrorValidate from "../exception/errorValidate";
export default class MovimentService extends ApiService {
  constructor() {
    super("api/moviments");
  }

  getMonthList() {
    return [
      { label: "Select...", value: "" },
      { label: "January", value: 1 },
      { label: "February", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "September", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
  }

  getById(id) {
    return this.get(`/${id}`);
  }

  changeStatus(id, status) {
    return this.put(`/${id}/update-status`, { status });
  }

  validate(moviment) {
    const errorList = [];

    if (!moviment.year) {
      errorList.push("Inform the year.");
    }

    if (!moviment.month) {
      errorList.push("Inform the month.");
    }

    if (!moviment.description) {
      errorList.push("Inform the description.");
    }

    if (!moviment.value) {
      errorList.push("Inform the value.");
    }

    if (!moviment.type) {
      errorList.push("Inform the type.");
    }

    if (errorList && errorList.length > 0) {
      console.log(errorList);
      throw new ErrorValidate(errorList);
    }
  }

  getTypeList() {
    return [
      { label: "Select...", value: "" },
      { label: "Outgo", value: "OUTGO" },
      { label: "Income", value: "INCOME" },
    ];
  }

  save(moviment) {
    return this.post("/", moviment);
  }

  update(moviment) {
    return this.put(`/${moviment.id}`, moviment);
  }

  consult(movimentFilter) {
    let params = `?year=${movimentFilter.year}`;

    if (movimentFilter.month) {
      params = `${params}&month=${movimentFilter.month}`;
    }

    if (movimentFilter.type) {
      params = `${params}&type=${movimentFilter.type}`;
    }

    if (movimentFilter.status) {
      params = `${params}&status=${movimentFilter.status}`;
    }

    if (movimentFilter.user) {
      params = `${params}&user=${movimentFilter.user}`;
    }

    if (movimentFilter.description) {
      params = `${params}&description=${movimentFilter.description}`;
    }

    return this.get(params);
  }

  deleteMoviment(id) {
    return this.delete(`/${id}`);
  }
}
