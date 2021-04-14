import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from '../../Modal';

export default class BuyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tickers: ['AAPL', 'AMZN', 'ZM', 'TSLA', 'NKE'],
            ticker: null,
            numShares: 0,
        };
    }

    handleChange = (e) => this.setState({[e.target.name]: e.target.value});

    buyShares = (e) => {
        e.preventDefault();

        const {numShares, ticker} = this.state;
        const {closeFunc, user, popUp} = this.props;

        if(!ticker || numShares <= 0) {
            closeFunc();
            popUp('You must select a ticker and a positive number of shares.', true);
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
            popUp('Share(s) Purchased Successfully', false);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {tickers} = this.state;
        const {closeFunc} = this.props;

        return (
            <Modal closeFunc={closeFunc} title="Buy Share(s)">
                <form>
                    <label>Ticker</label>
                    <select name="ticker" onChange={this.handleChange}>
                        <option value="Select Ticker">Select Ticker</option>
                        {tickers.map(ticker => <option value={ticker}>{ticker}</option>)}
                    </select>

                    <label>Number of Shares</label>
                    <input type="number" name="numShares" min="1" onChange={this.handleChange}/>

                    <button onClick={this.buyShares}>Buy {this.state.numShares} Shares</button>
                </form>
            </Modal>
        );
        
    }
}

BuyModal.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    closeFunc: PropTypes.func.isRequired,
};