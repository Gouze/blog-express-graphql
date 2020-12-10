import "./App.css";
import { Badge } from "@windmill/react-ui";

import React, { Component } from "react";

import LoginPage from "./pages/Login";
import PostsPage from "./pages/Posts";
import CommentsPage from "./pages/Comments";
import AuthContext from "./context/auth-context";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    localStorage.setItem("token", JSON.stringify(token));
  };
  logout = () => {
    localStorage.clear();
  };
  isLogged = () => {
    const localToken = localStorage.getItem("token");
    if (!localToken && localToken === "") {
      return true;
    }
    return true;
  };
  componentDidUpdate() {}

  isLogged = () => {
    const localToken = localStorage.getItem("token");
    if (!localToken && localToken === "") {
      return true;
    }
    return true;
  };
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
            isLogged: this.isLogged,
          }}
        >
          <Switch>
            {!this.isLogged && <Redirect from="/" to="/login" exact />}
            {this.isLogged && <Redirect from="/" to="/comments" exact />}
            {!this.isLogged && <Redirect from="/login" to="/comments" exact />}
            {this.isLogged && <Route path="/login" component={LoginPage} />}
            {!this.isLogged && <Route path="/posts" component={PostsPage} />}

            <Route path="/comments" component={CommentsPage} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
