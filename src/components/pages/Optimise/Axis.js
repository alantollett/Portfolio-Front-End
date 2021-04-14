import React from 'react';

export default class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            axes: [['expectedDividendYield', 'Expected Dividend Yield'],  
                  ['standardDeviation', 'Standard Deviation'], 
                  ['expectedReturn', 'Expected Return'], 
                  ['priceToBook', 'Price to Book Value']]
        };
    }

    render = () => {
        const {axes} = this.state;
        const {name, handleChange, selected} = this.props;

        return (
            <div className="tickers">
                <label>{name.toUpperCase()} Axis</label>
                <select name={name} onChange={handleChange}>
                    {axes.map((axis, index) => 
                        <option 
                            value={axis[0]} 
                            selected={index == selected ? "selected" : ""}
                        >{axis[1]}</option>)
                    }
                </select>
            </div>
        );
    }
}
