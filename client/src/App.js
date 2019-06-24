import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import UserContext from './components/UserContext';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Fobidden';

class App extends Component {

  state = {
    authenticationErrors: '',
  }

  handleSignIn(e, emailAddress, password) {
    if(e) {
      e.preventDefault();
    }
    axios.get('http://localhost:5000/api/users',
      {
        auth: {
          username: emailAddress,
          password: password
        }
      })
      .then(res => {
        if (res.status === 200) {
          const user = res.data;
          const fullName = user.firstName + ' ' + user.lastName;

          // Use Local Storage to add the user data
          localStorage.setItem('id', user.id);
          localStorage.setItem('username', emailAddress);
          localStorage.setItem('password', password);
          localStorage.setItem('fullName', fullName);

          // Clear form errors
          this.setState({
            authenticationErrors: ''
          });


          // Successful login redirects to homepage
          this.props.history.push('/');

          /**** ERROR COMING FROM THIS LINE*****/

        }
      })
      .catch( err => {
        console.log('error signing in', err);
        // if(err.response.status === 400) {
        //   this.setState({
        //   authenticationErrors: "Sorry, your email address or password is wrong - Please try again."
        //   });
        // } else if(error.response.status === 500) {
        //   this.props.history.push('/error');
        // }
      });
  }

  handleSignOut() {
    localStorage.clear();
    this.setState({
      authenticationErrors: ''
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          signIn: this.handleSignIn.bind(this),
          signOut: this.handleSignOut.bind(this),
          authenticationErrors: this.state.authenticationErrors
        }}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route exact path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" render={() => <UserSignIn />} />
              <Route exact path="/signup" component={UserSignUp} />
              <Route exact path="/courses/create" component={CreateCourse} />
              <Route exact path="/courses/:id/update" component={UpdateCourse} />
              <Route exact path="/fobidden" component={Forbidden} />
              <Route exact path="/notfound" component={NotFound} />
              <Route exact path="/error" component={Error} />
              <Route render={() => <NotFound />} />
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    )
  }
}

export default App;