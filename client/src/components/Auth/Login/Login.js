import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, InputGroup, Input, Button} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import styles from "./Login.module.css";
import Loader from "../../Loader/Loader";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard') // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

  onSubmit = e => {
      e.preventDefault();

      const userData = {
            email: this.state.email,
            password: this.state.password
      };
      this.props.loginUser(userData);
  };

  render() {
      const { errors } = this.state;
      const { auth } = this.props;
  return (
        <div className={styles.Login}>
          <div className={styles.BgImage}></div>
            <div className="row align-items-center">
              <div className="col-md-6 offset-md-1">
                  <h2 className="text-white display-2">MERN<br/> Banking</h2>
              </div>
            <div className="col-md-4">
              <div className={["card", "mx-auto", "my-5", styles.LoginCard].join(' ')}>
                 { auth.loading ? <Loader /> : <React.Fragment>
                 <div className="card-header">
                          <h1>Login</h1>
                    </div>
                    <div className="card-body">
                    <Form noValidate onSubmit={this.onSubmit}>
                      <FormGroup>
                        <InputGroup>
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-envelope"></i>
                            </span>
                          </div>
                          <Input
                            className="form-control form-control-lg"
                            placeholder="Email"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                          />
                        </InputGroup>
                        <span className={styles.Error}>{errors.email}</span>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-asterisk"></i>
                            </span>
                          </div>
                          <Input
                            className="form-control form-control-lg"
                            id="password" type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                          />
                        </InputGroup>
                        <span className={styles.Error}>{errors.password}</span>
                    </FormGroup>
                  <div className="form-group form-actions">
                    <Button className={["btn", "btn-lg", "btn-success", "btn-block", styles.CustomBtn].join(' ')} type="submit">Login</Button>
                  </div>
              </Form>
                    </div>
                    <div className="card-footer">
                    <Link to="/">
                        Back to home
                    </Link>
                    <p className="grey-text text-darken-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                    </div>
                  </React.Fragment>   }
              </div>
            </div>
          </div>

        </div>
      );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);