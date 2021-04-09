import React from 'react';
import axios from 'axios';

export default class Investments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ticker: 'AMZN',
            numShares: 1,

            error: null,
            stocks: null,
        };
    }

    componentDidMount(){
        this.getStockData();
    }

    getStockData(){
        axios.get('http://localhost:80/data/stocks').then(res => {
            this.setState({stocks: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    addInvestment = (purchase) => {
        // e.preventDefault();
        const {token, displaySuccess} = this.props;

        // create an investment object from the form
        const investment = {
            ticker: this.state.ticker,
            numShares: this.state.numShares,
            purchase: purchase
        };

        // post the form data to /investment
        // const headers = { Authorization: `Bearer ${token}`};
        axios.post(`http://localhost:80/investment`, {investment, token})
        .then((res) => {
            displaySuccess(`Share ${purchase ? 'Purchased' : 'Sold'} Successfully`);
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => {
        const {stocks, error} = this.state;
        const {user} = this.props;

        if(error){
            return <div>{error.message}</div>
        }else if(!stocks || stocks.length < 7) {
            // server may be refreshing and not loaded all data just yet, so wait a few seconds and update
            setTimeout(() => {
                this.getStockData();
                console.log('updated component');
            }, 5000);
            
            return <div>Downloading Stock Data...</div>;
        } else {
            for(var investment of user.investments){
                const stock = stocks.filter(stock => stock.ticker === investment.ticker)[0];
                investment['currentPrice'] = stock.sharePrice;
                investment['name'] = stock.name;
            }

            return (
                <div className="investments">
                    <h1>Investments</h1>
    
                    <div className="buttons">
                        <button onClick={() => this.addInvestment(true)}>Buy Share(s)</button>
                        <button onClick={() => this.addInvestment(false)}>Sell Share(s)</button>
                    </div>
    
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Number of Shares</th>
                            <th>Price per Share</th>
                            <th>Current Value</th>
                        </tr>
                        {user.investments ? user.investments.map(investment => (
                            <tr>
                                <td>{investment.name}</td>
                                <td>{investment.ticker}</td>
                                <td>{investment.numShares}</td>
                                <td>${investment.currentPrice}</td>
                                <td>${investment.currentPrice * investment.numShares}</td>
                            </tr>
                        )) : null}
                    </table>
                </div>
            );
        }
    }
}