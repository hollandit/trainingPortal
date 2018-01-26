import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import Helmet from './aplication';
import loginReducers from './reducer/loginDucks';
import Home from "./Home";
import Auth from "./AuthForm";

const rootReducer = combineReducers({
    login: loginReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

console.log(sessionStorage.getItem('auth'));

ReactDOM.render(
        <div>
        <Helmet title='Авторизация'/>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Auth}/>
                    <Route path='/index' render={() => sessionStorage.getItem('auth') !== null ? <Home /> : <Redirect to='/'/>}/>
                </Switch>
            </BrowserRouter>
        </Provider>
        </div>,
    document.getElementById('content')
);
