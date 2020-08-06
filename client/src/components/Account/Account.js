import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { Container, Row, Col } from 'reactstrap';
import ContactForm from './ContactForm';
import NameForm from './NameForm';
import SaveButton from '../Buttons/SaveButton';
import Axios from 'axios';

function Account(props) {
    const { auth, updateUser } = props;
    const [image, setImage] = useState({preview: 'https://via.placeholder.com/150', raw:''})
    const [userData, setUserData] = useState({});
    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
        }
    }

    useEffect(() => {
        Axios.get(`/api/users/user/${auth.user.id}`).then(res => {
            console.log(res.data);
            setUserData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);


    const handleUpdate = (e) => {
        e.preventDefault();
        // console.log(occupationInputRef.current.value, phoneInputRef.current.value);

        const imageFileReader = new FileReader();
        imageFileReader.readAsDataURL(image.raw);
        imageFileReader.onloadend = () => {
            const updateData = {
                photoURL: imageFileReader.result,
                occupation: occupationInputRef.current.value,
                phone: phoneInputRef.current.value
            }
            console.log(updateData);
            updateUser(auth.user.id, updateData);
        };        
    }

    const occupationInputRef = useRef(null);
    const phoneInputRef = useRef(null);

  return (
    <ProfileWrapper>
      <div className="profile-wrapper">
            <div className="header-wrapper">
                 <h6 className="header text-white">Profile</h6>
            </div>
            <Container>
                <Row>
                    <div className="horizontal-line">
                        <h6 className="header text-white mt-3">General information</h6>
                    </div>
                    <Col md="12">
                        <div className="d-flex flex-row my-5">
                            <div className="description-wrapper mr-5">
                                <p className="text-white">Picture</p>
                            </div>
                            <figure className="img-wrapper ml-5">
                                <label htmlFor="upload-btn">
                                    <img className="img-responsive" style={{width: "150px", height: "150px", objectFit: "cover" }} src={userData.photoURL ? userData.photoURL : image.preview} alt="Profile Pic"/>
                                </label>
                                <input type="file" id="upload-btn" style={{display: 'none'}} onChange={handleChange} />
                            </figure>
                        </div>
                    </Col>
                </Row>
                    <NameForm forwardRef={occupationInputRef}/>
                <Row>
                    <div className="horizontal-line">
                        <h6 className="header text-white mt-3">Contact information</h6>
                    </div>
                </Row>
                    <ContactForm forwardRef={phoneInputRef}/>
                <Row className="my-5">
                    <Col md="12">
                    <SaveButton clicked={handleUpdate}/>
                    </Col>
                </Row>
            </Container>
     </div>
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
font-family: 'DM Sans', sans-serif;
padding-left: 2rem;
background-color: #3a4149;
.profile-wrapper {
    width: 70rem;
    height: auto;
    background-color: #3a4149;
    border: 1px solid rgba(0, 0, 0, 0.4);
}
.header {
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    padding: 1.3rem 1rem 1rem 1rem;

}
.header-wrapper {
    background-color: #343b41;
    border-bottom: 1px solid #000;
}
.horizontal-line {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    width: 100%;
}

`;

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updateUser })(Account);