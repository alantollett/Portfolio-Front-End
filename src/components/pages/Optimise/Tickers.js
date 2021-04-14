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
                <label>Tickers</label>
                <select name="tickers" onChange={handleChange}>
                    <option value="Select Ticker">Select Ticker</option>
                    {allTickers.map(ticker => <option value={ticker}>{ticker}</option>)}
                </select>

                {Array.from(tickers).map(ticker => 
                    <span className="ticker">
                        {ticker} 
                        <button className="close-button" onClick={() => removeTicker(ticker)}>
                            <i className="fa fa-times"/>
                        </button>
                    </span>
                )}
            </div>
        );
    }
}
