import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/* Clear browser local storage on sign-out */
class UserSignOut extends Component {

  componentDidMount() {
    window.localStorage.clear();
  }

  render() {
    return(
      <Redirect to="/signin" />
    )
  }
}

export default UserSignOut;