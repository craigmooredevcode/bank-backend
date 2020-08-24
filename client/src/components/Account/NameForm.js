import React, { useState, useEffect } from 'react';
import styles from './NameForm.module.css';
import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Axios from 'axios';

const NameForm = (props) => {
    const { forwardRef, auth } = props;

    const [userData, setUserData] = useState({});
    const [formattedAcctNum, setFormattedAcctNum] = useState('');
    const [showAcctNum, setShowAcctNum] = useState(false);

    useEffect(() => {
        Axios.get(`/api/users/user/${auth.user.id}`).then(res => {
            // console.log(res.data);
            setUserData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        const { accountNumber } = userData;
        if(accountNumber) {
            const acctArr = accountNumber.toString().split('');
            const formattedAcctNum = `XXXXXX${acctArr.splice(6).join('')}`
            setFormattedAcctNum(formattedAcctNum);
            // console.log(formattedAcctNum);
        }
    }, [userData])

    const toggleAcctNum = (e) => {
        e.preventDefault();
        setShowAcctNum(!showAcctNum);
    }

  return (
    <Row style={{fontFamily: "'DM Sans', sans-serif"}}>
        <Col md="6">
            <Form>
                <FormGroup row>
                <Label className="text-white" for="name" sm={3}>First Name</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            readOnly
                            value={props.auth.user.name.split(" ")[0]}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label className="text-white" for="name" sm={3}>Last Name</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            readOnly
                            value={props.auth.user.name.split(" ")[1]}
                        />
                    </Col>
                </FormGroup>
            </Form>
        </Col>
        <Col md="6">
            <Form>
                <FormGroup row>
                <Label className="text-white" for="name" sm={3}>Account Type</Label>
                    <Col sm={9}>
                    <Input type="select" name="select" id="select">
                        <option>Savings Account</option>
                        <option>Checkings Account</option>
                        <option>Money Market</option>
                        {/* <option>Human Resources</option> */}
                    </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label className="text-white" for="acctNum" sm={3}>Account No.</Label>
                    <Col sm={9}>
                        <div className='d-flex'>
                            <Input
                                type="text"
                                name="acctNum"
                                id="acctNum"
                                innerRef={forwardRef}
                                value={ showAcctNum ? userData.accountNumber : formattedAcctNum }
                                readOnly
                            />
                            <button className={styles.btn} onClick={toggleAcctNum} style={{border: 'none', backgroundColor: '#E9ECEF', borderRadius: '5px', marginLeft: '-10px', paddingRight: '16px'}}>
                                { !showAcctNum ? <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg> :
                                <svg width="1em" height="1em" viewBox="0 0 16 16" 
                                    className="bi bi-eye-slash-fill" fill="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/>
                                    <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
                                </svg> }
                            </button>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
        </Col>
    </Row>
  )
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(NameForm);
