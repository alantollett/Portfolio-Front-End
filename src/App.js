import React from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import AccountPage from './components/pages/Account/AccountPage';
import Graph from './components/Graph';
import jwt_decode from 'jwt-decode';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null,
            expectedReturns: null,
            standardDeviations: null,

            pageVisible: "Account",
            errorMessage: null,
            successMessage: null,
            
            // (token = json web token (JWT) received from server upon login, and
            //  user = the user object (fName, lName, email etc) stored in the payload of the JWT)
            token: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/').then(res => {
            var portfolios = res.data;

            var expectedReturns = [];
            var standardDeviations = [];

            portfolios.forEach(portfolio => {
                expectedReturns.push(-portfolio.expectedReturn); // remove minus
                standardDeviations.push(portfolio.standardDeviation);
            });

            this.setState({
                portfolios: portfolios,
                expectedReturns: expectedReturns,
                standardDeviations: standardDeviations
            });
        }).catch(err => {
            this.setState({error: err});
        });
    }

    // updates the state to hold a JWT and the object decoded by it (user)
    // once updated, we can load the data (as we need a valid JWT to access it)
    setToken = (token) => {
        this.setState({token: token, user: jwt_decode(token), loginPage: false, accountPage: true});
    }

    displayError = (message) => {
        this.setState({errorMessage: message});

        setTimeout(() => {
            this.setState({errorMessage: null});
        }, 5000);
    }

    displaySuccess = (message) => {
        this.setState({successMessage: message});

        setTimeout(() => {
            this.setState({successMessage: null});
        }, 5000);
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations, user, errorMessage, successMessage} = this.state;
        
        return (
            <>
            <Navigation user={user}/>

            {errorMessage ? (
                    <div className="error">
                        <div className="wrapper"><p>{errorMessage}</p></div>
                    </div>
                ) : null}

            {successMessage ? (
                <div className="success">
                    <div className="wrapper"><p>{successMessage}</p></div>
                </div>
            ) : null}

            <AccountPage setToken={this.setToken} displayError={this.displayError} displaySuccess={this.displaySuccess} />
            {/* <Graph error={error} portfolios={portfolios} expectedReturns={expectedReturns} standardDeviations={standardDeviations}/> */}
            </>
        )
    }
}
