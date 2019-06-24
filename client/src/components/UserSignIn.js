import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext'

class UserSignIn extends Component {

  state = {
    emailAddress: '',
    password: '',
  };

  // Handle changes to the form inputs
  handleChange = e => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }


  render() {
    return (
      <UserContext.Consumer>
      {({ signIn, authenticationErrors }) => (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              {authenticationErrors ? (
                <div>
                  <h2 className="validation--errors--labels">Authentication error</h2>
                  <div className="validation-errors">
                    <ul>
                      <li>{authenticationErrors}</li>
                    </ul>
                  </div>
                </div>
              ):''}
              <form onSubmit={e => signIn(e, this.state.emailAddress, this.state.password)}>
                <div>
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"
                    className=""
                    placeholder="Email Address"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input 
                    id="password"
                    name="password"
                    type="password"
                    className=""
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="sumbit">Sign In</button>
                  <Link className="button button-secondary" to="/">Cancel</Link>
                </div>
              </form>
              <p>&nbsp;</p>
              <p>Don't have a user account?
                <Link to="/signup"> Click here </Link>
                to sign up!
              </p>
            </div>
          </div>
        </div>
      )}
      </UserContext.Consumer>
    )
  }
}

export default UserSignIn;