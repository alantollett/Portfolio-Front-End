import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AccountPage(props) {
    const {login, openPage, popUp} = props;

    return (
        <div className="account wrapper">
            <div className="grid">
                <LoginForm login={login} openPage={openPage} popUp={popUp}/>
                <RegisterForm popUp={popUp}/>
            </div>
        </div>
    );
}

AccountPage.propTypes = {
    login: PropTypes.func.isRequired,
    openPage: PropTypes.func.isRequired,
    popUp: PropTypes.func.isRequired,
};
