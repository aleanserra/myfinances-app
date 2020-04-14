import ApiService from "../apiservice";
import ErrorValidate from "../exception/errorValidate";
class UserService extends ApiService {
  constructor() {
    super("/api/users");
  }

  authenticate(credentials) {
    return this.post("/authenticate", credentials);
  }

  getBalanceByUser(id) {
    return this.get(`/${id}/balance`);
  }

  save(user) {
    return this.post("", user);
  }

  validate(user) {
    const errorList = [];

    if (!user.name) {
      errorList.push("Please enter name");
    }

    if (!user.email) {
      errorList.push("Please enter email");
    } else if (!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      errorList.push("Invalid email");
    }

    if (!user.password || !user.confirmPassword) {
      errorList.push("Enter password and confirm password");
    } else if (user.password !== user.confirmPassword) {
      errorList.push("Passwords do not match");
    }

    if (errorList && errorList.length > 0) {
      throw new ErrorValidate(errorList);
    }
  }
}

export default UserService;
