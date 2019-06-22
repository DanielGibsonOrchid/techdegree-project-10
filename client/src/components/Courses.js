import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.getCourses();
  }

  
  /*
  * Fetch the list of courses from API using axios
  */
  getCourses = () => {
    axios.get('http://localhost:5000/api/courses/')
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      //Catch any errors and log it to the console
      .catch(err => {
        console.log('Error fetching and parsing data', err);
      });
  }

  render() {
    
    const { courses } = this.state;

    return (
      <>
      <div className="bounds">
        <h1>List of Courses</h1>
        {courses.map((course, index) => (
          <div className="grid-33" key={index}>
            <Link className="course--module course--link" to={"/courses/"+course.id}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      </>
    )
  }

}

export default Courses;
