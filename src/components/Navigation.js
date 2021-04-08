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
                    <button onClick={() => openPage("home")} className={page === "home" ? "active left" : "left"}>Optimal Investor</button>
                    
                    <div className="right">
                        {user ? 
                            <>
                                <button onClick={() => openPage("portfolio")} className={page === "portfolio" ? "active" : ""}>My Portfolio</button>
                                <button onClick={() => openPage("optimise")} className={page === "optimise" ? "active" : ""}>Optimise</button>
                                <button onClick={() => logout()}>Logout</button>
                            </>
                        : 
                            <button onClick={() => openPage("account")} className={page === "account" ? "active" : ""}>Login</button>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
