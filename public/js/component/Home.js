import React, {Component} from 'react';
import Header from './Header';
import { connect } from 'react-redux';

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){

        const { user } = this.props;
        return(
            <div>
                <Header/>
                <h1>Добро пожаловать</h1>
                <div>ФИО: {user.name}</div>
                <div>Должность: </div>

                <h3>Доступные тесты: </h3>
                <h3>Доступные тренинги: </h3>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps)(Home);