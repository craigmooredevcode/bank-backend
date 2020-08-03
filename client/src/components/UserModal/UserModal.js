import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, InputGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { createUser } from '../../actions/authActions';
import styles from './UserModal.module.css';
import Loader from '../Loader/Loader';


class UserModal extends Component {
    state = {
        modal: false,
        name: "",
        email: "",
        password: "",
        password2: "",
        balance: null,
        accountNumber: 0,
        errors: {}
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            })
        }

        if(this.state.modal) {
            if(Object.entries(this.state.errors).length === 0 && this.props.auth.loading) {
                this.setState({
                    modal: false
                })
            }
        }
    }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal,
          name: '',
          email: '',
          password: '',
          password2: '',
          balance: '',
          errors: {}
        }));
        this.setState({
            accountNumber: this.generateAccountNumber()
        })
      }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        if(this.state.errors[e.target.id] !== '') {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    [e.target.id]: ''
                }
            })
        }
    };

    onSubmit = e => {
        e.preventDefault();

        let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { name, email, password, password2, balance } = this.state;
        const fields = {
            name, email, password, password2, balance
        }
        
        const errorInit = {}
        for (const key in fields) {            
            if(!fields[key]) {
                errorInit[key] = 'This field is required';
            }
            if(!fields.email.match(validMail)) {
                errorInit.email = 'Email is invalid';
            }
            if(fields.password && fields.password.length < 6) {
                errorInit.password = 'Password must be at least 6 characters';
            }
            if(fields.password !== fields.password2) {
                errorInit.password2 = 'Passwords must match';
            }
        }

        this.setState({
            ...this.state,
            errors: errorInit
        })
        // console.log(errorInit);

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            balance: this.state.balance,
            accountNumber: this.state.accountNumber
        };

        if(Object.entries(errorInit).length === 0) {
            this.props.createUser(newUser);
            if(!this.props.auth.loading) {
                this.toggle();
            }
        }
        
    }

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
        return(
            <div className={styles.UserModal}>
                <Button className={["mx-auto", "d-block", "btn-lg", styles.CreateButton].join(' ')}
                onClick={this.toggle}>
                    Create new user</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    { auth.loading ? <Loader /> : <React.Fragment>
                        <ModalHeader toggle={this.toggle}>Create New User</ModalHeader>
                        <ModalBody>
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
                                    <i className="fas fa-dollar-sign"></i>
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
                                    <i className="fas fa-university"></i>
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
                        </ModalBody>
                    </React.Fragment>}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {createUser})(UserModal);