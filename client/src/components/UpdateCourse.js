import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: [],
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      validationErrors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  handleSubmit = (e) => {
    const {match: { params }} = this.props;
    e.preventDefault();
    axios ({
      method: 'put',
      url: `http://localhost:5000/api/courses/${params.id}`,
      auth: {
        username: window.localStorage.getItem('Email'),
        password: window.localStorage.getItem('Password')
      },
      data: {
        id: params.id,
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded,
      }
    })
    .then(res => {
      this.props.history.push(`/courses/${params.id}`);
    })
    .catch(err => {
      if (err.response.status === 500) {
        console.error('Error fetching and parsing data', err);
        this.props.history.push('/error');
      } else {
        this.setState({ validationErrors: err.response.data.message })
      }
    });
  }

  // Handle changes to the form inputs
  handleChange = e => {
    this.setState({
      [ e.target.name ] : e.target.value 
    });
  }

  handleCancel = (e) => {
    let { history } = this.props;
    let { course } = this.state;
    e.preventDefault();
    history.push(`/courses/${course.id}`);
  }

  componentDidMount() {
    const { match: { params }} = this.props;
    axios.get(`http://localhost:5000/api/courses/${params.id}`)
      .then(res => {
        if(res.data.userId === JSON.parse(localStorage.getItem('UserId'))) {
          this.setState({
            user: res.data.User,
            title: res.data.title,
            description: res.data.description,
            estimatedTime: res.data.estimatedTime,
            materialsNeeded: res.data.materialsNeeded,
          });
        } 
        else {
          this.props.history.push('/forbidden');
        }
      })
      .catch(err => {
        if (err.response.status === 500) {
          console.error('Error fetching and parsing data', err);
          this.props.history.push('/error');
        } else {
          this.props.history.push('/notfound');
        }
      });
  }

  render() {

    const { title, description, estimatedTime, materialsNeeded, user, validationErrors } = this.state;
    
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
          <form onSubmit={this.handleSubmit}>
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
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <p>By {user.firstName} {user.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={description}
                    onChange={e => this.handleChange(e)}
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
                        onChange={e => this.handleChange(e)}
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
                        onChange={e => this.handleChange(e)}
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
              <Link 
                className="button button-secondary" 
                to={"/courses/" + this.props.match.params.id}
                >Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdateCourse;