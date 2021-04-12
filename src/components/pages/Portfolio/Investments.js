import React from 'react';
import axios from 'axios';

export default class Investments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ticker: 'AMZN',
            numShares: 1,

            error: null,
            investments: null,
        };
    }

    componentDidMount(){        
        axios.get('http://localhost:80/data/investments', {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({investments: res.data});
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
        const {investments, error} = this.state;
        const {user} = this.props;

        if(error){
            return <div>{error.message}</div>
        } else{
            return (
                <div className="investments">
                    <h1>Investments</h1>
    
                    <div className="buttons">
                        <button onClick={() => this.addInvestment(true)}>Buy Share(s)</button>
                        <button onClick={() => this.addInvestment(false)}>Sell Share(s)</button>
                    </div>
    
                    {!investments ? <div>Downloading Investments Data...</div> : (
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Ticker</th>
                                <th>Number of Shares</th>
                                <th>Price per Share</th>
                                <th>Current Value</th>
                            </tr>
                            {investments.map(investment => (
                                <tr>
                                    <td>{investment.name}</td>
                                    <td>{investment.ticker}</td>
                                    <td>{investment.numShares}</td>
                                    <td>${investment.sharePrice}</td>
                                    <td>${investment.sharePrice * investment.numShares}</td>
                                </tr>
                            ))}
                        </table>
                    )}
                </div>
            );
        }
    }
}