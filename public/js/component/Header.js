import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class Header extends Component{
    logout = () => {
        localStorage.removeItem('persist:root');
    };
    render(){
        if(!localStorage.getItem('persist:root')) {
            return <Redirect to='/'/>;
        }
        return(
            <nav className="navbar navbar-light bg-faded">
                <h1 className="navbar-brand">Holland</h1>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/index" className='nav-link'>Главная страница<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link">База знаний</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link">Тренинги</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link">Тестирование</Link>
                    </li>
                    <li className="nav-item">
                        <form className="form-inline">
                            <input type="text" placeholder="Поиск" className="form-control"/>
                            <button type="submit" className="btn btn-outline-success">Найти</button>
                        </form>
                    </li>
                    <li className="nav-item pull-xs-right">
                        <label className="nav-link" onClick={this.logout}>Выйти</label>
                    </li>
                </ul>
            </nav>
        );
    }
}