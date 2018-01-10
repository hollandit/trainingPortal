import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function TextFields() {
    return(
        <div>
            <form>
                <Fields text="Введите логин"/>
                <Fields text="Введите пароль"/>
            </form>
        </div>
    );
}

class Fields extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <MuiThemeProvider>
            <div>
                <TextField
                    hintText={this.props.text}
                />
            </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <TextFields />,
    document.getElementById('content')
);