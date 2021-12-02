/* eslint-disable no-console */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthenticatedGuard(props) {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      component={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isLoggedIn,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedGuard);
