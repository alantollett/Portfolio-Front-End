import React from 'react';
import axios from 'axios';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {             
            email: null,
            email2: null,
            password: null,
            password2: null,
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    registerUser = (e) => {
        e.preventDefault();
        const {password, password2, email, email2} = this.state;
        const {displayError, displaySuccess} = this.props;

        // validate form inputs
        var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if(password == null) return displayError("You must enter a password");
        if(password2 == null) return displayError("You must confirm your password");
        if(password !== password2) return displayError("Passwords must match.");
        if(!passwordRegex.test(password)) return displayError("Your password must: \n- contain at least one uppercase character, \n- contain at least one lowercase character, \n- contain at least one number, \n- be at least 8 characters long.");
        if(email == null) return displayError("You must enter an email.");
        if(email2 == null) return displayError("You must confirm your email.");
        
        // create a user object from the form
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        // post the form data to /register.
        // the server then sends an email to the user with a verification link.
        axios.post(`http://localhost:80/user/register`, {user}, {crossDomain: false})
        .then((res) => {
            displaySuccess('Please check your email to verify your account.');
        }).catch(err => {
            console.log(err);
            const status = err.response.status;

            if(status === 409){
                displayError('An account with that email address already exists.');
            }else if(status === 500){
                displayError('Internal Server Error, please contact alantollett@outlook.com.');
            }
        });
    }

    render = () => {
        return (
            <div className="grid-item">
                <h1>Sign Up</h1>

                <form onSubmit={this.registerUser}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleChange}/>

                    <label>Confirm Email</label>
                    <input type="email2" name="email2" onChange={this.handleChange}/>

                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>

                    <label>Confirm Password</label>
                    <input type="password" name="password2" onChange={this.handleChange}/>
                    
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}
