import React from 'react';
import PropTypes from 'prop-types';
import Tickers from './Tickers';
import Axis from './Axis';

export default class OptimiseSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickers: new Set(),
            x: 'standardDeviation',
            y: 'expectedDividendYield',
            z: 'expectedReturn',
            optimalOnly: true,
        };
    }

    handleChange = (e) => {
        if(e.target.name === 'ticker'){
            const tickers = this.state.tickers;

            const max = 5;
            if(tickers.size === max){
                this.props.popUp(`You can only add ${max} stocks to a portfolio.`, true);
            }else {
                tickers.add(e.target.value);
                this.setState({tickers: tickers});
            }
        } else if(e.target.name === 'optimalOnly'){
            this.setState({optimalOnly: !e.target.checked});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    removeTicker = (ticker) => {
        const tickers = this.state.tickers;
        tickers.delete(ticker);
        this.setState({tickers: tickers});
    }

    loadVisualisation = (e) => {
        e.preventDefault();
        this.props.updateSettings({
            tickers: this.state.tickers,
            x: this.state.x,
            y: this.state.y,
            z: this.state.z,
            optimalOnly: this.state.optimalOnly
        });
    }

    render = () => {
        const {tickers} = this.state;

        return (
            <div className="settings grid-item">
                <h1>Settings</h1>

                <form>
                    <Tickers tickers={tickers} handleChange={this.handleChange} removeTicker={this.removeTicker}/>
                    <Axis name="x" selected={0} handleChange={this.handleChange}/>
                    <Axis name="y" selected={1} handleChange={this.handleChange}/>
                    <Axis name="z" selected={2} handleChange={this.handleChange}/>
                    
                    <label style={{display: "inline", marginRight: "1em"}}>Display Non-Optimal Portfolios</label>
                    <input 
                        style={{width: "fit-content", transform: "scale(1.5)"}} 
                        type="checkbox" name="optimalOnly" 
                        onChange={this.handleChange}
                    />

                    <button className="optimise-button" onClick={this.loadVisualisation}>View Optimal Portfolios</button>
                </form>
            </div>
        );
    }
}

OptimiseSettings.propTypes = {
    popUp: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
};