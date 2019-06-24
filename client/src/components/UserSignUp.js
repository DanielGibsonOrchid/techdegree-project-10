import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div>
                <input 
                  id="firstname" 
                  name="firstname" 
                  type="text"
                  className=""
                  placeholder="First Name"
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input 
                  id="lastname" 
                  name="lastname" 
                  type="text"
                  className=""
                  placeholder="Last Name"
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  className=""
                  placeholder="Email Address"
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input 
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  onChange={this.handleInput}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="sumbit">Sign In</button>
                <Link className="button button-secondary" to="/">Cancel</Link>
              </div>
            </form>
            <p>&nbsp;</p>
            <p>Already have a user account?
              <Link to="/signin"> Click here </Link>
              to sign in!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignUp;