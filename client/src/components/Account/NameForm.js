import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Axios from 'axios';

const NameForm = (props) => {
    const { forwardRef, auth } = props;

    const [userData, setUserData] = useState({});

    useEffect(() => {
        Axios.get(`/api/users/user/${auth.user.id}`).then(res => {
            console.log(res.data);
            setUserData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

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
                <Label className="text-white" for="occupation" sm={3}>Occupation</Label>
                    <Col sm={9}>
                        <Input
                            type="text"
                            name="occupation"
                            id="occupation"
                            innerRef={forwardRef}
                            value={userData.occupation}
                        />
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
