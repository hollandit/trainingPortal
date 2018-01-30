import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const id = this.props.match.params.id;
        return(
            <div>Test {id}</div>
        );
    }
}