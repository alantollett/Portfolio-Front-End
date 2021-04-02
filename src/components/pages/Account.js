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
                <h1>Loading Dashboard...</h1>
            );
        }else{
            return (
                <h1>Please Login or Register for an Account</h1>
            );
        }


    }
}
