import React from 'react';
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
        const {displayError, login, openPage} = this.props;

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
                displayError('The account information you provided is incorrect.');
            }else if(status === 412){
                displayError('You must verify your email before logging in.');
            }else if(status === 500){
                displayError('Internal Server Error, please contact alantollett@outlook.com.');
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
