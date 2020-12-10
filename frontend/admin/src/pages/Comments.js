import React, { Component } from "react";
import Layout from "../components/Layout/Layout";

import AuthContext from "../context/auth-context";

export class CommentsPage extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <Layout>
        <h1 className="font-bold text-2xl">Comments Page</h1>
        {this.context.isLogged() && <h1>pas co</h1>}
      </Layout>
    );
  }
}

export default CommentsPage;
