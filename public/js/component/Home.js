import React, {Component} from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { theme } from '../redux/test/testActions';
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props);
    }
    state = {item: []};

    componentWillMount(){
        axios.get('/api/test-thema')
            .then(response => this.setState({item: Object.values(response.data)}));
        // this.props.theme();
    }

    render(){
        const {user} = this.props;
        // const { user, isError, isLoading, themeName, errorMessage } = this.props;
        // const shouldShowError = !isError || !isLoading;
        // const shouldShowData = !isLoading && !isError;
        // console.log(themeName);
        return(
            <div>
                <Header/>
                <h1>Добро пожаловать</h1>
                {/*<div className='error'>{shouldShowError && errorMessage}</div>*/}
                <div>ФИО: {user.name}</div>
                <div>Должность: </div>

                <h3>Доступные тесты: </h3>
                    <ul>
                        {this.state.item.map(item => (
                            <li key={item.id}>
                                <Link to={`/test/${item.id}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                <h3>Доступные тренинги: </h3>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.login.user,
    // isError: state.theme.isError,
    // isLoading: state.theme.isLoading,
    // errorMessage: state.theme.errorMessage,
    // themeName: state.theme.thema
});

// const mapDispatchToProps = {
//     theme,
// };

export default connect(mapStateToProps)(Home);