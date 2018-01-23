import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect }from 'react-redux';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaiseButtin from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class UserForm extends Component{
    state = {
        form: {
            login: "",
            password: ""
        },
        error: "",
        redirectTo: "",
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.addUser(this.state.form);
        axios.post('/api/user', this.state.form)
            .then(response => {
                if (response.data === false){
                    this.setState({ error: 'Неверный логин или пароль'});
                } else {
                    this.setState({redirectTo: '/index'});
                }
            })
            .catch(err => console.log(err));
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState( prevState => ({
            form: {
                ...prevState.form,
                [name]: value,
            }
        }));
    };

    render(){
        const { form, error, redirectTo } = this.state;
        if(redirectTo) return <Redirect to={redirectTo}/>;
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
                            value={form.login}
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
                            value={form.password}
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
export default connect(
    state => ({
        login: state
    }),
    dispatch => ({
        addUser: (user) => {
            dispatch({type: 'ADD_USER', user: user})
        }
    })
)(UserForm)