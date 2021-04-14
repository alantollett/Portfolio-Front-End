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

    areInputsValid = () => {
        const {email, email2, password, password2} = this.state;
        const {popUp} = this.props;

        // ensure user has inputted two matching emails
        if(email == null || email2 == null || email !== email2) {
            popUp("Please enter two matching emails.", true);
            return false;
        }

        // ensure user has inputted two matching passwords
        if(password == null || password2 == null || password !== password2) {
            popUp("Please enter two matching passwords.", true);
            return false;
        }

        // ensure password matches the requirements
        var passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if(!passwordRegex.test(password)) {
            popUp("Your password must contain at least one uppercase, lowercase, and numerical character, and be at least 8 characters long.", true);
            return false;
        } 

        return true;
    }
    
    registerUser = (e) => {
        e.preventDefault();
        const {popUp} = this.props;
        const {email, password} = this.state;

        // validate form inputs
        if(!this.areInputsValid()) return;
        
        // create a user object from the form
        const user = {email: email, password: password};

        // post the form data to /register.
        // the server then sends an email to the user with a verification link.
        axios.post(`http://localhost:80/user/register`, {user}, {crossDomain: false})
        .then((res) => {
            popUp('Please check your email to verify your account.', false);
        }).catch(err => {
            if(!err.response) return popUp('Failed to connect to server, please try again soon.', true);
            
            const status = err.response.status;
            if(status === 409) return popUp('An account with that email address already exists.', true);
            if(status === 500) return popUp('Internal Server Error, please contact alantollett@outlook.com.', true);
            return popUp('Unknown Error, please contact alantollett@outlook.com.', true);
        });
    }

    render = () => {
        return (
            <div className="grid-item">
                <h1>Sign Up</h1>

                <form>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleChange}/>

                    <label>Confirm Email</label>
                    <input type="email2" name="email2" onChange={this.handleChange}/>

                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>

                    <label>Confirm Password</label>
                    <input type="password" name="password2" onChange={this.handleChange}/>
                    
                    <button onClick={this.registerUser}>Sign Up</button>
                </form>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    popUp: PropTypes.func.isRequired,
};