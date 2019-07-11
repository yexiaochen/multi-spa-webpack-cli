// import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ logged }) => ({
  logged
});
const AuthorizedRoute = ({ logged, component: Component, ...rest }) => {
  console.log('logged', logged);
  return (
    <Route
      {...rest}
      render={props =>
        logged ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default connect(mapStateToProps)(AuthorizedRoute);
