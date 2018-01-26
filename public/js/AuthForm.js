import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect }from 'react-redux';
import TextField from 'material-ui/TextField';
import RaiseButtin from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { login } from '../redux/login/loginActions';

injectTapEventPlugin();

class UserForm extends Component{
    state = {
        form: {
            login: "",
            password: ""
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.form);
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
        const { form } = this.state;
        const { isLoading, isError, shouldRedirect, errorMessage } = this.props;
        if (shouldRedirect) return <Redirect to='/index'/>;
        return(
            <div className='authForm'>
                <h1>Авторизация</h1>
                <div className='error'>{isError && errorMessage}</div>
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

const mapStateToProps = state => ({
    isLoading: state.login.isLoading,
    isError: state.login.isError,
    shouldRedirect: state.login.shouldRedirect,
    errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)