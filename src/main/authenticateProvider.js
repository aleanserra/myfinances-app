import React from "react";

import AuthService from "../app/service/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProviderAuthenticate extends React.Component {
  state = {
    userAuthenticated: null,
    isAuthenticated: false,
  };

  startSession = (user) => {
    AuthService.login(user);
    this.setState({ isAuthenticated: true, userAuthenticated: user });
  };

  endSession = () => {
    AuthService.removeUserAuthenticated();
    this.setState({ isAuthenticated: false, userAuthenticated: null });
  };

  render() {
    const context = {
      userAuthenticated: this.state.userAuthenticated,
      isAuthenticated: this.state.isAuthenticated,
      startSession: this.startSession,
      endSession: this.endSession,
    }
    return (
      <AuthProvider value={context}> {this.props.children} </AuthProvider>
    )
  }
}

export default ProviderAuthenticate;
