import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Auth from './component/AuthForm';
import Helmet from './aplication';

ReactDOM.render(
    <div>
        <Helmet title='Авторизация'/>,
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Auth}/>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById('content')
);