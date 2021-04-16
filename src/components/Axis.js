import React from 'react';
import PropTypes from 'prop-types';

export default class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            // map of titles to portfolio object attributes
            axes: [['standardDeviation', 'Standard Deviation'], 
                  ['expectedDividendYield', 'Expected Dividend Yield'],
                  ['expectedReturn', 'Expected Return']]
        };
    }

    render = () => {
        const {axes} = this.state;
        const {name, handleChange, selected} = this.props;

        return (
            <div className="tickers">
                <label>{name.toUpperCase()} Axis</label>
                <select name={name} onChange={handleChange} defaultValue={axes[selected][0]}>
                    {axes.map((axis, index) => <option key={index} value={axis[0]}>{axis[1]}</option>)}
                </select>
            </div>
        );
    }
}

Axis.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};
