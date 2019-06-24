import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    user: '',
    validationErrors: '',
  }

  componentDidMount() {
    this.getCourse();
  }

  // Get course data for matching course ID
  getCourse = () => {
    axios.get(`http://localhost:5000/api/courses/` + this.props.match.params.id)
      .then(res => {
        const course = res.data;

        if(course.User.id !== parseInt(localStorage.getItem("id"))) {
          this.props.history.push('/forbidden');
        } else {
          this.setState({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            fullName: `${course.User.firstName} ${course.User.lastName}`,
          });
        }
      })
      //Catch and handle errors
      .catch(err => {
        if (err.response.status === 404) {
          this.props.history.push('/notfound');
        } else {
          console.error('Error fetching and parsing data', err);
          this.props.history.push('/error');
        }
      });
  }
  
  // Handle changes to the form inputs
  handleChange = e => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }

  // Handle form submit - Update course data
  handleSubmit = (e) => {
    e.preventDefault();

    const { id, title, description, estimatedTime, materialsNeeded } = this.state;
    
    if (title === '' && description === '') {
      this.setState({
        validationErrors: "Please enter a title and a description"
      });
    } else if (title === '') {
      this.setState({
        validationErrors: "Please enter a title"
      });
    } else if (description === '') {
      this.setState({
        validationErrors: "Please enter a description"
      });
    } else {
      axios({
        method: 'put',
        url: `http://localhost:5000/api/courses/` + this.props.match.params.id,
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        },
        data: {
          title,
          description,
          estimatedTime, 
          materialsNeeded,
        }
      })
      .then(() => {
        this.props.history.push(`/courses/` + this.props.match.params.id)
        console.log("Successful update")
      })
      .catch( err => {
        if (err.response.status === 400) {
          this.setState({
            validationErrors: err.response.data.message
          });
        } else if (err.response.status === 500) {
          console.error('Error fetching and parsing data', err);
          this.props.history.push('/error');
        }
      });
    }
  }



  render() {

    const { title, description, estimatedTime, materialsNeeded, validationErrors, fullName } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          {validationErrors ? (
            <div>
              <h2 className="validation--errors--labels">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>{validationErrors}</li>
                </ul>
              </div>
            </div>
          ):''}
          <form onSubmit={e => this.handleSubmit(e, title, description, materialsNeeded, estimatedTime)}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input 
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>
                <p>By {fullName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={estimatedTime}
                        onChange={this.handleChange}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={materialsNeeded}
                        onChange={this.handleChange}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Update Course
              </button>
              <Link className="button button-secondary" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdateCourse;