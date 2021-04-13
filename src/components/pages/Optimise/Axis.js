import React from 'react';

export default class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            axes: [['standardDeviation', 'Standard Deviation'], 
                  ['expectedDividendYield', 'Expected Dividend Yield'], 
                  ['expectedReturn', 'Expected Return'], 
                  ['priceToBook', 'Price to Book Value']]
        };
    }

    render = () => {
        const {axes} = this.state;
        const {name, handleChange} = this.props;

        return (
            <div className="tickers">
                <label>{name.toUpperCase()} Axis</label>
                <select name={name} onChange={handleChange}>
                    <option value="Select Factor">Select Factor</option>
                    {axes.map(axis => <option value={axis[0]}>{axis[1]}</option>)}
                </select>
            </div>
        );
    }
}
