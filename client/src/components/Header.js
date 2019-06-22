import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => (

  <div className="header">
    <div className="bounds">
      <Link className="header--logo" to="/">Courses</Link>
      <Link className="signup" to="/signup">Sign Up</Link>
      <Link className="signin" to="/signin">Sign In</Link>
    </div>
  </div>
);

export default Header;
