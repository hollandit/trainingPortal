import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import loginReducer from './redux/login/loginReducer';
import AuthProvider from './containers/AuthProvider';
import Home from "./component/Home";
import Auth from "./AuthForm";
import { WithHelmet, withHelmet } from './utils/WithHelmet';

const rootReducer = combineReducers({
    login: loginReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

console.log(sessionStorage.getItem('auth'));

ReactDOM.render(
        <div>
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider authComponent={withHelmet({ title: 'Авторизация'})(Auth)}>
                <Route path='/' strict>
                  <WithHelmet title='Главная страница'>
                    <Home />
                  </WithHelmet>
                </Route>
              </AuthProvider>
            </BrowserRouter>
          </Provider>
        </div>,
    document.getElementById('content')
);

