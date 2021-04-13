import React from 'react';
import PropTypes from 'prop-types';
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
        const {popUp} = this.props;

        // validate form inputs
        var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if(password == null) return popUp("You must enter a password", true);
        if(password2 == null) return popUp("You must confirm your password", true);
        if(password !== password2) return popUp("Passwords must match.", true);
        if(!passwordRegex.test(password)) return popUp("Your password must: \n- contain at least one uppercase character, \n- contain at least one lowercase character, \n- contain at least one number, \n- be at least 8 characters long.", true);
        if(email == null) return popUp("You must enter an email.", true);
        if(email2 == null) return popUp("You must confirm your email.", true);
        
        // create a user object from the form
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        // post the form data to /register.
        // the server then sends an email to the user with a verification link.
        axios.post(`http://localhost:80/user/register`, {user}, {crossDomain: false})
        .then((res) => {
            popUp('Please check your email to verify your account.', false);
        }).catch(err => {
            const status = err.response.status;
            if(status === 409){
                popUp('An account with that email address already exists.', true);
            }else if(status === 500){
                popUp('Internal Server Error, please contact alantollett@outlook.com.', true);
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

RegisterForm.propTypes = {
    popUp: PropTypes.func.isRequired,
};