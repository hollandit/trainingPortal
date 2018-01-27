import React from 'react';
import { connect } from 'react-redux';

const AuthProvider = ({ authenticate, authComponent, children}) => {
    return authenticate ? children : React.createElement(authComponent);
};

export default connect(state => ({
    authenticate: Boolean(state.login.user)
}))(AuthProvider)