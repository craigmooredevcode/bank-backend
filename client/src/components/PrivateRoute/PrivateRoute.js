import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if(auth.isAuthenticated === true) {
        if(auth.user.isAdmin === true) {
          return <Redirect to="/admin-user" />
        } else {
          return <Component {...props} />
        }
      } else {
        return <Redirect to="/login" />
      }
    } 
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);