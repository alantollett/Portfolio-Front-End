import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {             
            email: null,
            password: null
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    loginUser = (e) => {
        e.preventDefault();
        const {openPage, login, popUp} = this.props;

        // create a user object from the form
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        // post the form data to /login.
        // the result is a json web token which represents the full user object.
        axios.post(`http://localhost:80/user/login`, {user}, {crossDomain: false})
        .then((res) => {
            login(res.data.shortAccessToken, res.data.fullAccessToken);
            openPage('portfolio');
        }).catch(err => {
            const status = err.response.status;
            if(status === 404 || status === 401){
                popUp('The account information you provided is incorrect.', true);
            }else if(status === 412){
                popUp('You must verify your email before logging in.', true);
            }else if(status === 500){
                popUp('Internal Server Error, please contact alantollett@outlook.com.', true);
            }
        });
    }

    render = () => {
        return (
            <div className="grid-item">
                <h1>Login</h1>

                <form onSubmit={this.loginUser}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleChange}/>

                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    
                    <input type="submit" value="Sign In"/>
                </form>
            </div>
        )
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    openPage: PropTypes.func.isRequired,
    popUp: PropTypes.func.isRequired,
};