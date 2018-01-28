import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const loginSelector = state => state.login;
const isLoggedInSelector = createSelector(
    loginSelector,
    login => login.isLoggedIn
);

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
);

const mapStateToProps = state => ({
    isLoggedIn: isLoggedInSelector(state),
});

export default connect(mapStateToProps)(PrivateRoute);