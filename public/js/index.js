import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import Auth from './component/AuthForm';
import Helmet from './aplication';

ReactDOM.render(
    <Helmet title='Авторизация'/>,
    <Router>
        <Switch>
            <Route path='/' component={Auth}/>
        </Switch>
    </Router>,
    document.getElementById('content')
);