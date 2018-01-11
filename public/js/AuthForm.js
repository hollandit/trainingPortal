import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaiseButtin from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class UserForm extends React.Component{
    state = {
        login: "",
        password: "",
    };

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    }
    render(){
        const { login, password } = this.state;
        return(
            <div>
                <form method='post' action="/">
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