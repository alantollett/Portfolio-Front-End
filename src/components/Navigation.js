import React from 'react';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render = () => {
        const {user, page, openPage, logout} = this.props;

        return (
            <nav>
                <div className="wrapper"> 
                    <button onClick={() => openPage("home")} className="home-button">
                        PORTFOLIO <span className="gold">OPTIMISER</span>
                    </button>
                    
                    <div className="right">
                        {user ? 
                            <>
                                <button onClick={() => openPage("portfolio")}>My Portfolio</button>
                                <button onClick={() => openPage("optimise")} >Optimise</button>
                                <button onClick={() => logout()}>Logout</button>
                            </>
                        : 
                            <button onClick={() => openPage("account")}>Login</button>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
