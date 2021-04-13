import React from 'react';

export default class Tickers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            allTickers: ['AAPL', 'AMZN', 'ZM', 'TSLA', 'NKE']
        };
    }

    render = () => {
        const {allTickers} = this.state;
        const {tickers, handleChange, removeTicker} = this.props;

        return (
            <div className="tickers">
                <div className="top-box">
                    <label>Tickers</label>
                    <select name="tickers" onChange={handleChange}>
                        <option value="Select Ticker">Select Ticker</option>
                        {allTickers.map(ticker => <option value={ticker}>{ticker}</option>)}
                    </select>
                </div>

                {Array.from(tickers).map(ticker => 
                    <span className="ticker">{ticker} <button onClick={() => removeTicker(ticker)}>x</button></span>
                )}
            </div>
        );
    }
}
