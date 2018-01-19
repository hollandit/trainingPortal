import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Route,Switch } from 'react-router';

class Form extends React.Component{
    render(){
        return(
            <Router path='/router/:number' />
        )
    }
}

ReactDOM.render(
    <Form />,
    document.getElementById('root')
);