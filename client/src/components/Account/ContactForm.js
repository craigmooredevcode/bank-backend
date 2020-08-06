import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Axios from 'axios';

const ContactForm = (props) => {
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
    <Row className="my-5" style={{fontFamily: "'DM Sans', sans-serif"}}>
        <Col md="6">
            <Form>
                <FormGroup row>
                <Label className="text-white" for="email" sm={3}>Email</Label>
                    <Col sm={9}>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={props.auth.user.email}
                        />
                    </Col>
                </FormGroup>
            </Form>
        </Col>
        <Col md="6">
            <Form>
                <FormGroup row>
                <Label className="text-white" for="phone" sm={3}>Phone</Label>
                    <Col sm={9}>
                        <Input
                            type="number"
                            name="phone"
                            id="phone"
                            innerRef={forwardRef}
                            value={userData.phone}
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

export default connect(mapStateToProps, { loginUser })(ContactForm);