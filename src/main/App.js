import React from "react";

import Routes from "./routes";
import Navbar from "../components/navbar";
import ProviderAuthenticate from "./authenticateProvider";

import "toastr/build/toastr.min.js";

import "bootswatch/dist/flatly/bootstrap.css";
import "../custom.css";
import "toastr/build/toastr.css";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends React.Component {
  render() {
    return (
      <ProviderAuthenticate>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </ProviderAuthenticate>
    );
  }
}

export default App;
