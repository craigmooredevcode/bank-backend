import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, FormGroup, InputGroup, Input, Button} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import styles from "./Register.module.css";
import Loader from "../../Loader/Loader";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      balance: null,
      accountNumber: 0,
      errors: {}
    };
  }
  componentDidMount() {
    this.setState({
      accountNumber: this.generateAccountNumber()
    })

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/panel");
    }
  }
  componentWillReceiveProps(nextProps) {
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

      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          balance: this.state.balance,
          accountNumber: this.state.accountNumber
      };
      this.props.registerUser(newUser, this.props.history);
  };

  generateAccountNumber = () => {
    let acctNumArr = [3, 0, 5, 8];
    for(let i = 0; i < 6; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      acctNumArr.push(randomDigit);
    }
    return acctNumArr.join('');
  }

  render() {
      const { errors } = this.state;
      const { auth } = this.props;
  return (
        <div className={styles.Register}>
          <div className={styles.BgImage}></div>
            <div className="row align-items-center">
              <div className="col-md-6 offset-md-1">
                <h2 className="text-white display-2">Prime<br/> Bank</h2>
              </div>
              <div className="col-md-4 my-5">
                <div className="card">
                  {auth.loading ? <Loader /> : <React.Fragment>
                  <div className="card-header">
                      <h1>Register</h1>
                  </div>
                  <div className="card-body">
                    <Form noValidate onSubmit={this.onSubmit}>
                      <FormGroup>
                        <InputGroup>
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-user"></i>
                            </span>
                          </div>
                          <Input
                            className="form-control form-control-lg"
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            placeholder="Name"
                          />
                        </InputGroup>
                        <span className={styles.Error}>{errors.name}</span>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-envelope"></i>
                          </span>
                        </div>
                        <Input
                          className="form-control form-control-lg"
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email"
                          placeholder="Email"
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
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password"
                          placeholder="Password"
                        />
                      </InputGroup>
                      <span className={styles.Error}>{errors.password}</span>
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
                          onChange={this.onChange}
                          value={this.state.password2}
                          error={errors.password2}
                          id="password2"
                          type="password"
                          placeholder="Confirm password"
                        />
                      </InputGroup>
                      <span className={styles.Error}>{errors.password2}</span>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i class="fas fa-dollar-sign"></i>
                          </span>
                        </div>
                        <Input
                          className="form-control form-control-lg"
                          onChange={this.onChange}
                          value={this.state.balance}
                          error={errors.balance}
                          id="balance"
                          type="number"
                          placeholder="Enter initial balance"
                        />
                      </InputGroup>
                      <span className={styles.Error}>{errors.balance}</span>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i class="fas fa-university"></i>
                          </span>
                        </div>
                        <Input
                          className="form-control form-control-lg"
                          onChange={this.onChange}
                          value={this.state.accountNumber}
                          error={errors.accountNumber}
                          id="accountNumber"
                          type="number"
                          placeholder="Generate an Account Number"
                        />
                      </InputGroup>
                      <span className={styles.Error}>{errors.accountNumber}</span>
                    </FormGroup>
                    <div className="form-group form-actions">
                            <Button className={["btn", "btn-lg", "btn-block", styles.CustomBtn, "btn-success"].join(' ')} type="submit">Register</Button>
                    </div>
                  </Form>
                </div>
                <div className="card-footer">
                  <Link to="/" className="btn-default">
                      Back to home
                  </Link>
                  <p className="text-dark">
                        Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
                  </React.Fragment>}
                </div>
              </div>
           </div>
      </div>
      );
    }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));