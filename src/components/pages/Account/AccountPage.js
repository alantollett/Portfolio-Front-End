import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {login, displayError, openPage, displaySuccess} = this.props;

        return (
            <div className="account wrapper">
                <div className="grid">
                    <LoginForm login={login} displayError={displayError} openPage={openPage}/>
                    <RegisterForm displayError={displayError} displaySuccess={displaySuccess}/>
                </div>
            </div>
        );
    }
}
