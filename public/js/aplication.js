import React from 'react';
import { Helmet } from 'react-helmet';

class Application extends React.Component{
    constructor(prop){
        super(prop);
    }
    render(){
        return(
            <div className='application'>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>{this.props.title}</title>
                </Helmet>
            </div>
        );
    }
}

module.exports = Application;