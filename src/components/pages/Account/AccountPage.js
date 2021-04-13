import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class AccountPage extends React.Component {
    render = () => {
        const {login, openPage, popUp} = this.props;

        return (
            <div className="account wrapper">
                <div className="grid">
                    <LoginForm login={login} openPage={openPage} popUp={popUp}/>
                    <RegisterForm popUp={popUp}/>
                </div>
            </div>
        );
    }
}

AccountPage.propTypes = {
    login: PropTypes.func.isRequired,
    openPage: PropTypes.func.isRequired,
    popUp: PropTypes.func.isRequired,
};
