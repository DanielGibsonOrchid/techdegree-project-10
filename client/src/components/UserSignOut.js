import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class UserSignOut extends Component {
  signOut = () => {
    window.localStorage.removeItem('FirstName')
    window.localStorage.removeItem('LastName')
    window.localStorage.removeItem('Email')
    window.localStorage.removeItem('Password')
    window.localStorage.removeItem('UserId')
    window.localStorage.removeItem('IsLoggedIn')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('password')
    window.localStorage.removeItem('username')
    window.location.assign('/SignIn')
    
  }

  componentDidMount() {
    this.signOut();
  }
  render() {
    return(
      <Redirect to="/signin" />
    )
  }
}

export default UserSignOut;