import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Auth from './component/AuthForm';
import Home from './component/Home';
import Helmet from './aplication';

function user(state = {}, action){
    if(action.type === 'ADD_USER'){
        return [
            ...state,
            action.user
        ];
    }
    return state;
}

const store = createStore(user, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
        <div>
        <Helmet title='Авторизация'/>
        <Provider store={store}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Auth}/>
                        <Route path='/index' component={Home}/>
                    </Switch>
            </BrowserRouter>
        </Provider>
        </div>,
    document.getElementById('content')
);