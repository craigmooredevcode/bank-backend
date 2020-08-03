import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Admin.module.css';
import { getAllUsers, deleteUser, logoutUser } from '../../actions/authActions';
import UserModal from '../UserModal/UserModal';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

class Admin extends Component {
    state = {
        modal: false,
        targetedUser: null
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.auth.users !== this.props.auth.users) {
            this.props.getAllUsers();
        }
    }

    setDeleteTarget = (e) => {
        this.setState({
            targetedUser: e.target.id
        }, () => {
            this.toggle();
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    deleteUser = () => {
        // console.log(e.target.id);
        this.props.deleteUser(this.state.targetedUser);
        this.toggle();
    }

    cancelDelete = () => {
        this.setState({
            targetedUser: ''
        }, () => {
            this.toggle();
        })
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render () {
        return (
            <div className={styles.Admin}>
                <h2 className="display-4 mx-auto">ADMIN DASHBOARD</h2>
                <hr className="mb-5"/>
                <UserModal />
                <Button size="lg" color="danger" 
                className={[styles.LogoutBtn, 'ml-4', 'mb-1'].join(' ')} onClick={this.handleLogout}>
                    Logout
                </Button>
                <div className="row mt-5">
                    { this.props.auth.users.map((user, idx) => {
                        return (
                            <div key={`user_${idx}`} className="col-md-6 mb-4">
                                <div className={['card', styles.UserCard].join(' ')}>
                                    <h3 className="font-weight-bold">{user.name}</h3>
                                    <p>{user.email}</p>
                                    <p><span className="font-weight-bold">Balance: </span>{`$${user.balance.toFixed(2)}`}</p>
                                    <div className="card-footer">
                                        <button className="btn-sm btn-danger" id={user.email} onClick={this.setDeleteTarget}>Delete User</button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                            <ModalHeader toggle={this.toggle}>Confirm to Delete</ModalHeader>
                                            <ModalBody>
                                                <p>Are you sure you want to delete this user?</p>
                                                <button className="btn-sm btn-danger mr-2" onClick={this.deleteUser}>Confirm</button>
                                                <button className="btn-sm btn-success" onClick={this.cancelDelete}>Cancel</button>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { getAllUsers, deleteUser, logoutUser })(Admin);