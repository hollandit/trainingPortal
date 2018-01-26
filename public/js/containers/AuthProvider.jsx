import React from 'react';

const AuthProvider = ({ authenticated, authComponent, children }) => {
  return authenticated ? children : authComponent;
};

export default connect(state => ({
  authenticated: Boolean(state.login.user)
}))(AuthProvider);
