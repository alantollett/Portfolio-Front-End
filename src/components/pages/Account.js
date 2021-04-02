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
                <div className="account wrapper">
                    <div className="grid">
                        <div className="grid-item">
                            <h1>Login</h1>
                        </div>
                        <div className="grid-item">
                            <h1>Register</h1>
                        </div>
                    </div>
                </div>
            );
        }


    }
}
