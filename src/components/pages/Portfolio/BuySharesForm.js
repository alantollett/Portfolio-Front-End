import React from 'react';
import axios from 'axios';

export default class BuySharesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tickers: ['AAPL', 'AMZN', 'ZM', 'TSLA', 'NKE'],
            ticker: null,
            numShares: 0,
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    buyShares = (e) => {
        e.preventDefault();

        const {numShares, ticker} = this.state;
        const {displayError, closeFunc, displaySuccess, user} = this.props;

        if(!ticker || numShares <= 0) {
            closeFunc();
            displayError('You must select a ticker and a positive number of shares.');
            return;
        }

        // create an investment object from the form
        const investment = {
            ticker: this.state.ticker,
            numShares: this.state.numShares
        };

        // post the form data to /investment
        axios.post(`http://localhost:80/user/investments`, {investment}, {
            headers: { Authorization: `Bearer ${user.token}`}
        }).then((res) => {
            closeFunc();
            displaySuccess('Share(s) Purchased Successfully');
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {tickers, ticker} = this.state;
        const {closeFunc, user} = this.props;

        return (

            <div className="modal-background">
                <div className="modal">
                    <div className="modal-header">
                        <h1>Buy Share(s)</h1>
                        <button onClick={closeFunc} className="modal-close"><i className="fa fa-times"></i></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={this.buyShares}>
                            <label>Ticker</label>
                            <select name="ticker" onChange={this.handleChange}>
                                <option value="Select Ticker">Select Ticker</option>
                                {tickers.map(ticker => <option value={ticker}>{ticker}</option>)}
                            </select>

                            <label>Number of Shares</label>
                            <input type="number" name="numShares" min="1" onChange={this.handleChange}/>

                            <input type="submit" value="Buy Shares"/>
                        </form>
                    </div>
                </div>
            </div>
        );
        
    }
}