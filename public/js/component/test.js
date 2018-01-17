import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentQuestion: 0
        }
    }

    componentDidMount(){
        $.get('spi/test:id');
    }

    onClick = (e) => {
        if(this.state.currentQuestion !== 2){
            e.preventDefault();
        }
        this.setState({
            currentQuestion: ++this.state.currentQuestion
        })
    };
    render(){
        const { thema } = this.props;
        const question = thema[0].test[this.state.currentQuestion];

        return(
            <div>
                {thema.map(({ id, name, test }) => (
                    <div key={id} className='container'>
                        <h1>{name}</h1>
                        <form>
                            <div key={question.id} className='question'>
                                <p>{question.name}</p>
                                <ul>
                                    {question.answer.map(answer => (
                                        <li key={answer.id}>
                                            <input type='radio' name={answer.id_question}/>
                                            {answer.text}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={this.onClick}>Ответить</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        )
    }
}

ReactDOM.render(
    <Form thema={thema} />,
    document.getElementById('root')
);