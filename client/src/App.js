import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  constructor() {
    super();
    this.state = {
      validationError: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn(loginDetails, props) {
    axios.get("http://localhost:5000/api/users", {
      auth: {
        username: loginDetails.emailAddress,
        password: loginDetails.password
      }
    }).then(res => { 
      window.localStorage.setItem('FirstName',res.data.firstName)
      window.localStorage.setItem('LastName', res.data.lastName)
      window.localStorage.setItem('Email',loginDetails.emailAddress)
      window.localStorage.setItem('Password',loginDetails.password)
      window.localStorage.setItem('UserId', JSON.stringify(res.data.id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      // window.location.assign('/')
      this.setState({ validationError: '' })

      /*
      *
      * Error #1 - props.history is not working. Seems like there is no props being passed through - Not sure how to fix this
      * 
      */
      const { history, location } = props;
      const path = location.state ? location.prevLocation : '/';
      history.push(path);


    })
    /*
      *
      * Error #2 - err.response is undefined (console error) - Not sure how to fix this
      * 
      */
    .catch(err => {
      if (err.response.status === 500) {
        console.error('Error fetching and parsing data', err);
        this.props.history.push('/error');
      } else {
        this.setState ({validationError: err.response.data.message })
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="root">
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourse} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetail} />

            <Route exact path="/signin" component={() => <UserSignIn 
              signIn={this.signIn} 
              validationError={this.state.validationError}
              isValidated={this.state.isValidated}
            /> } />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />

            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/error" component={UnhandledError} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>    
    );
  }
}

export default App;