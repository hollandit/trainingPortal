import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import loginReducer from './redux/login/loginReducer';
import testReducer from './redux/test/testReducer';
import AuthProvider from './containers/AuthProvider';
import Home from "./component/Home";
import Auth from "./AuthForm";
import Test from './Test';
import { WithHelmet, withHelmet } from './utils/WithHelmet';

const rootReducer = combineReducers({
    login: loginReducer,
    theme: testReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider authComponent={withHelmet({ title: 'Авторизация'})(Auth)}>
                  <Switch>
                      <Route path='/' strict>
                          <WithHelmet title='Главная страница'>
                            <Home />
                          </WithHelmet>
                      </Route>
                      <Route path='/test/:id'>
                        <WithHelmet title='Тест'>
                            <Test/>
                        </WithHelmet>
                      </Route>
                  </Switch>
              </AuthProvider>
            </BrowserRouter>
          </Provider>,
    document.getElementById('content')
);