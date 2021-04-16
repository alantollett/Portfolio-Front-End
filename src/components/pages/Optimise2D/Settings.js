import React from 'react';
import PropTypes from 'prop-types';
import Tickers from '../../Tickers';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickers: new Set(),
            riskWeighting: 0.5,
            returnWeighting: 0.5,
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
            riskWeighting: this.state.riskWeighting,
            returnWeighting: this.state.returnWeighting,
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

                    <label>Risk</label>
                    <p>Move the slider closer to the factor which you would prefer to <b>minimise</b>.</p>
                    <div className="slider">
                        <span>Standard Deviation</span> 
                        <span style={{float: "right"}}>Price to Book Value</span>
                        <input type="range" min="0" max="1" value={this.state.riskWeighting} step="0.25" name="riskWeighting" onChange={this.handleChange}/>
                    </div>

                    <label>Return</label>
                    <p>Move the slider closer to the factor which you would prefer to <b>maximise</b>.</p>
                    <div className="slider">
                        <span>Expected Return</span> 
                        <span style={{float: "right"}}>Dividend Yield</span>
                        <input type="range" min="0" max="1" value={this.state.returnWeighting} step="0.25" name="returnWeighting" onChange={this.handleChange}/>
                    </div>

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

Settings.propTypes = {
    popUp: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
};