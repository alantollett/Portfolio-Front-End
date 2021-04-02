// pages: account, dashboard, investment, optimisation
import React from 'react';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: false,
            dashboard: false,
            investments: false,
            optimiser: false,
        };
    }

    openPage = () => {

    }

    render = () => {
        const {user} = this.props;
        const {account, dashboard, investments, optimiser} = this.state;

        return (
            <nav>
                <div className="wrapper"> 
                    <button className="left">Portfolio Optimiser</button>
                    
                    <div className="right">
                        {user ? 
                            <>
                            <button onClick={this.openPage("dashboard")} className={dashboard ? "active" : ""}>Dashboard</button>
                            <button onClick={this.openPage("investments")} className={investments ? "active" : ""}>Investments</button>
                            <button onClick={this.openPage("optimiser")} className={optimiser ? "active" : ""}>Optimiser</button>
                            </>
                        : null}
                    </div>
                </div>
            </nav>
        )
    }
}
