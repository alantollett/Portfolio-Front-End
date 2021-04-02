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
        const {displayError, displaySuccess, setToken} = this.props;

        // create a user object from the form
        const user = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        };

        // post the form data to /login.
        // the result is a json web token which represents the full user object.
        axios.post(`localhost:5000/login`, {user}, {crossDomain: true})
        .then((res) => {
            setToken(res.data.accessToken);
            displaySuccess('Logged in successfully!');
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
                    
                    <input type="submit" value="Sign In" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}
