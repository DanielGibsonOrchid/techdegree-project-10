import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  if(JSON.parse(localStorage.getItem('IsLoggedIn'))){
    return (
      <div className="header">
        <div className="bounds">
          <Link to="/">
            <h1 className="header--logo">Courses</h1>
          </Link>
          <nav>
            <span>{`Welcome ${localStorage.getItem('FirstName')} ${localStorage.getItem('LastName')}!`}</span>
            <Link className="signin" to="/signout">Sign Out</Link>
          </nav>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="bounds">
          <Link to="/">
            <h1 className="header--logo">Courses</h1>
          </Link>
          <nav>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin">Sign In</Link>
          </nav>
        </div>
      </div>
    )
  }
};

export default Header;
