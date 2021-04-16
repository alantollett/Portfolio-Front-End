import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import axios from 'axios';

export default class PortfolioModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInvestments: null,
            investmentsRequired: null,
        };
    }

    // when opened start loading user investments, once done
    // calculate the required investments to obtain portfolio
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_PATH}/user/investments`, {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({userInvestments: res.data});
            this.loadRequiredInvestments();
        }).catch(err => {
            this.setState({error: err});
        });
    }

    // https://www.geeksforgeeks.org/gcd-two-array-numbers/
    gcd(a, b) {
        if (a === 0) return b;
        return this.gcd(b % a, a);
    }

    // https://www.geeksforgeeks.org/gcd-two-array-numbers/
    findGCD(arr) {
        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = this.gcd(arr[i], result);
    
            if(result === 1)
            {
            return 1;
            }
        }
        return result;
    }

    loadRequiredInvestments = () => {
        const {userInvestments} = this.state;
        const {portfolio} = this.props;
        const {tickers, weights} = portfolio;

        var investmentsRequired = null;
        if(userInvestments) {
            // find the smallest number of shares required in each
            // stock in order to maintain the portfolio's weightings
            var sharesRequired = weights.map(weight => weight * 100);
            const gcd = this.findGCD(sharesRequired);
            sharesRequired = sharesRequired.map(weight => weight / gcd);

            // create a list of stocks to buy/sell based upon shares required
            investmentsRequired = sharesRequired.map((numShares, index) => {
                const ticker = tickers[index];
                var shares = numShares;

                // if the user already owns shares then decrease number of shares to buy
                const existingInvestments = userInvestments.filter(inv => inv.ticker === ticker);
                if(existingInvestments.length > 0) shares -= existingInvestments[0].numShares;

                return {
                    ticker: tickers[index],
                    numShares: shares
                }
            });

            // remove any investments which require 0 shares...
            investmentsRequired = investmentsRequired.filter(inv => inv.numShares !== 0);

            // add any other investments the user has (which now need to be sold)
            for(var investment of userInvestments){
                if(!tickers.includes(investment.ticker)){
                    investmentsRequired.push({
                        ticker: investment.ticker,
                        numShares: -investment.numShares
                    });
                }
            }

            // populate toBuy and toSell based on the investments
            this.setState({
                investmentsRequired: investmentsRequired,
                toBuy: investmentsRequired.filter(inv => inv.numShares > 0),
                toSell: investmentsRequired.filter(inv => inv.numShares < 0)
            });
        }
    }

    // update user investments to equal the portfolio
    obtainPortfolio = async () => {
        const {closeFunc, popUp, user} = this.props;
        const investments = this.state.investmentsRequired;

        for(var investment of investments){
            // post the form data to /investment
            await axios.post(`${process.env.REACT_APP_API_PATH}/user/investments`, {investment}, {
                headers: { Authorization: `Bearer ${user.token}`}
            }).catch(err => {
                console.log(err);
            });
        }

        closeFunc();
        popUp('Portfolio Obtained Successfully', false);
    }

    render() {
        const {toBuy, toSell, userInvestments} = this.state;
        const {closeFunc, portfolio} = this.props;
        
        return (
            <Modal closeFunc={closeFunc} title="Obtain Portfolio">
                {!userInvestments ? <div className="loading">Calculating...</div> : (
                    <>
                    <h2>Portfolio Details</h2>
                    <ul>
                        <li>Expected Return: {portfolio.expectedReturn}</li>
                        <li>Dividend Yield: {portfolio.expectedDividendYield}</li>
                        <li>Standard Deviation: {portfolio.standardDeviation}</li>
                        <li>Price to Book Value: {portfolio.priceToBook}</li>
                    </ul>

                    <h2>To obtain this portfolio...</h2>

                    {!toBuy || toBuy.length === 0  ? <h2>Buy Nothing!</h2> : (
                        <ul>
                            {toBuy.map((inv, index) => 
                                <li key={index} className="green">+ {inv.numShares} share(s) in {inv.ticker}.</li>
                            )}
                        </ul>
                    )}

                    {!toSell || toSell.length === 0 ? <h2>And Sell Nothing!</h2> : (
                        <ul>
                            {toSell.map((inv, index) => 
                                <li key={index} className="red">- {Math.abs(inv.numShares)} share(s) in {inv.ticker}.</li>
                            )}
                        </ul>
                    )}

                    <button onClick={this.obtainPortfolio}>Obtain Portfolio</button>
                    </>
                )}
            </Modal>
        );
        
    }
}

PortfolioModal.propTypes = {
    popUp: PropTypes.func.isRequired,
    closeFunc: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};