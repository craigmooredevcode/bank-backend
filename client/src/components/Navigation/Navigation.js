import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
 } from 'reactstrap';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from 'prop-types';
import Search from '../Modal/Search';
// import MessagesDropdown from './MessagesDropdown';
import Axios from 'axios';
class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          userData: null
        };
    }

    componentDidMount() {
      console.log(this.props.auth.user.id);
      Axios.get(`/api/users/user/${this.props.auth.user.id}`).then(res => {
        console.log(res.data);
        const user = res.data;
        this.setState({
          userData: user
        }, console.log(this.state.userData))
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.transactions !== this.props.transactions) {
        Axios.get(`/api/users/user/${this.props.auth.user.id}`).then(res => {
          const user = res.data;
          this.setState({
            userData: user
          })
        })
      }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
  render() {
    const { user } = this.props.auth;
    const { userData } = this.state;
    const balance = {...userData}.balance;
    const photoURL = {...userData}.photoURL;
    // const fixedBal = balance.toFixed(2);
    console.log(balance);
    return (
      <div>
        <Navbar expand="md" fixed="top" style={{fontFamily: "DM Sans", backgroundColor: "#2a323a"}}>
          <NavbarBrand>
              <span className="text-white text-uppercase">
                 {user.name}
              </span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto d-flex flex-row justify-content-center align-items-center" navbar>
              <NavItem className="text-white" style={{fontSize: '18px'}}>BALANCE: ${balance}</NavItem>
              <NavItem>
                  <Search/>
              </NavItem>
              {/* <NavItem>
                   <MessagesDropdown/>
              </NavItem> */}
              <NavItem>
                <NavLink href="/account">
                    <img className="img-fluid rounded-circle mx-3 mb-1" style={{width: "40px", height: "40px", objectFit: "cover"}} src={photoURL ? photoURL : "https://via.placeholder.com/40" } alt="Avatar"/>
                </NavLink>
              </NavItem>
              <NavItem>
                    <Button color="danger" onClick={this.onLogoutClick}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };


const mapStateToProps = state => {
    return {
        auth: state.auth,
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, {logoutUser})(Navigation)