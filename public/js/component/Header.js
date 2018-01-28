import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/login/loginActions';
import { Redirect } from 'react-router';

class Header extends Component{
    logoutAccount = () => {
        this.props.logout();
    };
    render(){
        const { user } = this.props;
        if(!user) return <Redirect to='/'/>;
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
                        <Link to="#" className="nav-link" onClick={this.logoutAccount}>Выйти</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});
const mapDispatchToProps = {
    logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);