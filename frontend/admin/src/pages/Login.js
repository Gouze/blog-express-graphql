import React, { Component } from "react";

import Layout from "../components/Layout/Layout";

import AuthContext from "../context/auth-context";

import AuthService from "../services/auth-service";

export class LoginPage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }
  submitHandler = (e) => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    AuthService.login(email, password).then((res) => {
      console.log(res);
    });
  };
  render() {
    return (
      <Layout>
        <form onSubmit={this.submitHandler}>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div>
            <button type="submit">Login</button>
            {!this.context.isLogged() && <h1>je devrais être co</h1>}
          </div>
        </form>
      </Layout>
    );
  }
}

export default LoginPage;
