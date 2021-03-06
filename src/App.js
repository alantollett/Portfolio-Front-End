import React from 'react';
import jwt_decode from 'jwt-decode';

import Navigation from './components/Navigation';
import PopUp from './components/PopUp';
import HomePage from './components/pages/Home/HomePage';
import AccountPage from './components/pages/Account/AccountPage';
import PortfolioPage from './components/pages/Portfolio/PortfolioPage';
import Optimise2DPage from './components/pages/Optimise2D/Optimise2DPage';
import Optimise3DPage from './components/pages/Optimise3D/Optimise3DPage';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "home",
            popUps: [],
            user: null
        };
    }

    // opens the specified page (home/dashboard/optimise)
    openPage = (page) => this.setState({currentPage: page});


    // adds a user object to the state based upon json web tokens
    login = (smallToken, largeToken) => {
        var user = jwt_decode(largeToken);
        user['token'] = smallToken;
        this.setState({user: user});
    }
    
    // removes the user from the state and returns to the home page
    logout = () => this.setState({user: null, currentPage: "home"});

    // adds a message to the pop-up
    addPopUp = (message, error) => {
        // create a popUp object
        const popUp = {message: message, error: error};

        // add to the popUps list
        var popUps = this.state.popUps;
        popUps.push(popUp);
        this.setState({popUps: popUps});

        // remove the popUp after 4 seconds...
        setTimeout(() => {
            this.removePopUp(popUp);
        }, 4000);
    }

    // removes the specified popUp
    removePopUp = (popUp) => {
        var popUps = this.state.popUps;
        if(popUps.includes(popUp)) {
            popUps = popUps.filter(p => p !== popUp);
            this.setState({popUps: popUps});
        }
    }

    render = () => {
        const {currentPage, popUps, user} = this.state;
        
        return (
            <>
            <Navigation user={user} openPage={this.openPage} page={currentPage} logout={this.logout}/>
            {popUps ? popUps.map((popUp, index) => 
                <PopUp key={index} closeEarly={this.removePopUp}>{popUp}</PopUp>) 
            : null}

            {currentPage === "home" ? <HomePage openPage={this.openPage}/> : null}

            {currentPage === "account" ? 
                <AccountPage login={this.login} popUp={this.addPopUp} openPage={this.openPage}/> 
            : null}

            {currentPage === "portfolio" ? <PortfolioPage user={user} popUp={this.addPopUp}/> : null}
            {currentPage === "optimise2d" ? <Optimise2DPage user={user} popUp={this.addPopUp}/> : null}
            {currentPage === "optimise3d" ? <Optimise3DPage user={user} popUp={this.addPopUp}/> : null}
            </>
        )
    }
}