import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaiseButtin from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class UserForm extends React.Component{
    state = {
        login: "",
        password: "",
        error: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/user', this.state)
            .then(response => {
                if (response.data === false){
                    this.setState({ error: 'Неверный логин или пароль'});
                } else {
                    return <Redirect to='/index'/>;
                }
            })
            .catch(err => console.log(err));
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    render(){
        const { login, password, error } = this.state;
        return(
            <div className='authForm'>
                <h1>Авторизация</h1>
                <div className='error'>{error}</div>
                <form onSubmit={this.handleSubmit}>
                    <MuiThemeProvider>
                        <TextField
                            hintText="Введите логин"
                            name="login"
                            fullWidth={true}
                            value={login}
                            required={true}
                            onChange={this.handleChange}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <TextField
                            hintText="Введите пароль"
                            type="password"
                            name="password"
                            fullWidth={true}
                            value={password}
                            required={true}
                            onChange={this.handleChange}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <RaiseButtin label="Войти" fullWidth={true} className="authForm-button"> <input type="submit" className="authForm-input" /> </RaiseButtin>
                    </MuiThemeProvider>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <UserForm />,
    document.getElementById('content')
);