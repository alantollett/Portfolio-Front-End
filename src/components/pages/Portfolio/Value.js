import React from 'react';

export default class Value extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {user} = this.props;

        if(user.worths.length === 0){
            return (
                <div className="value">
                    <h1>$0</h1>
                    <p>No data yet...</p>
                </div>
            );
        }

        const startWorth = user.worths[0].amount;
        const currWorth = user.worths[user.worths.length - 1].amount;
        const increase = (((currWorth - startWorth) / startWorth) * 100).toFixed(2);

        return (
            <div className="value">
                <h1>${currWorth}</h1>
                <p className={increase >= 0 ? "increase" : "decrease"}>
                    {increase >= 0 ? 
                        <span>Up by ${(currWorth - startWorth).toFixed(2)} </span>
                    :
                        <span>Down by ${(startWorth - currWorth).toFixed(2)} </span>
                    }
                    ({Math.abs(increase)}%)
                </p>
            </div>
        );
    }
}
