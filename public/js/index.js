import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/lib/integration/react';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import loginReducer from '../redux/login/loginActions';
import AuthProvider from './containers/AuthProvider';
import Auth from "./AuthForm";
import Home from "./component/Home";
import { WithHelmet, withHelmet } from "./utils/WithHelmet"

const rootReducer = combineReducers({
    login: loginReducer,
});

// const persistConfig = {
//     key: 'root',
//     storage: storage
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// const persisrtor = persistStore(store);

// ReactDOM.render(
//         <div>
//             <Provider store={store}>
//                 <PersistGate loading={null} persistor={persisrtor}>
//                     <BrowserRouter>
//                         <Switch>
//                             <Route exact path='/' component={Auth}/>
//                             <PrivateRouter path='/index' component={Home}/>
//                         </Switch>
//                     </BrowserRouter>
//                 </PersistGate>
//             </Provider>
//         </div>,
//     document.getElementById('content')
// );
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

