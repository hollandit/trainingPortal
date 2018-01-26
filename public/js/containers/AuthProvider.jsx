import React from 'react';
import { connect } from 'react-redux';

const AuthProvider = ({ authenticated, authComponent, children }) => {
  return authenticated ? children : React.createElement(authComponent);
};

export default connect(state => ({
  authenticated: Boolean(state.login.user)
}))(AuthProvider);
