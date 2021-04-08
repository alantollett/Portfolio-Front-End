import React from 'react';

export default class PortfolioValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const invested = 800.00;
        const value = 903.11;
        const increase = (((value - invested) / invested) * 100).toFixed(2);

        return (
            <div className="value">
                <h1>£{value}</h1>
                <p className={increase >= 0 ? "increase" : "decrease"}>
                    {increase >= 0 ? 
                        <span>Up by £{(value - invested).toFixed(2)} </span>
                    :
                        <span>Down by £{(invested - value).toFixed(2)} </span>
                    }
                    ({Math.abs(increase)}%)
                </p>
            </div>
        );
    }
}
