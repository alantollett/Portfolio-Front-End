import React from 'react';

export default class PortfolioValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const invested = 900.53;
        const value = 901.53;

        return (
            <div className="value">
                {/* for each ticker (value += num shares * currentSharePrice) */}
                <span>£{value}</span>
                
                {value - invested >= 0 ? 
                    <p className="increase">Up By £{value - invested} since you began investing.</p>
                :
                    <p className="decrease">Down By £{invested - value} since you began investing.</p>
                }
            </div>
        );
    }
}
