import React, { Component } from "react";
import { Redirect } from "react-router";

class RedirectToHome extends Component {
  render() {
    return <Redirect to="/" />;
  }
}

export default RedirectToHome;
