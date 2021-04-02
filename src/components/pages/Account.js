import React from 'react';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {user} = this.props;

        if(user){
            return (
                <div className="wrapper">
                    <h1>Loading Dashboard...</h1>
                </div>
            );
        }else{
            return (
                <div className="wrapper">
                    <h1>Please Login or Register for an Account</h1>
                </div>
            );
        }


    }
}
