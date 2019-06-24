import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';

class CourseDetail extends Component {
  state = {
    course: {},
    id: this.props.match.params.id,
    fullName: '',
  };

  componentDidMount() {
    const { id } = this.state;
    this.getCourse(id);
  }
  
  /***
  * Fetch the list of courses from the API using axios
  ***/
  getCourse = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(res => {
        this.setState({
          course: res.data,
          fullName: `${res.data.User.firstName} ${res.data.User.lastName}`,
        });
      })
      //Catch and handle errors
      .catch(err => {
        if (err.response.status === 400) {
          this.props.history.push('/notfound');
        } else {
          console.error('Error fetching and parsing data', err);
          this.props.history.push('/error');
        }
      });
  }

  render () {

    const { id, course, fullName } = this.state;
    // const props = useSpring({opacity: 1, from: {opacity: 0}})

    return (
      // <animated.dv style={props}>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1}}>
        {props => (
          <div style={props}>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <Link className="button" to={`/courses/${id}/update`}>
                      Update Course
                    </Link>
                    <button className="button" to="/">
                      Delete Course
                    </button>
                  </span>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By {fullName}</p>
                </div>
                <div className="course-description">
                  <ReactMarkdown source={course.description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkdown source={course.materialsNeeded} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
      // </animated.dv>
    )
  }

}

export default CourseDetail;
