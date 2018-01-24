import React, {Component} from 'react';
import Header from './component/Header';
import Hemlet from './aplication';

export default class Home extends Component {
    render(){
        return(
            <div>
                <Hemlet title='Главная страница'/>
                <Header/>
                <h1>Добро пожаловать</h1>
            </div>
        );
    }
}