import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export default class InvestmentsTable extends React.Component {

    sellShare = (ticker) => {
        const {user, popUp, updateInvestments} = this.props;
        const investment = {ticker: ticker, numShares: -1};

        axios.post(`${process.env.REACT_APP_API_PATH}/user/investments`, {investment}, {
            headers: { Authorization: `Bearer ${user.token}`}
        }).then((res) => {
            popUp('Share(s) Sold Successfully', false);
            updateInvestments();
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => {
        const {investments} = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Number of Shares</th>
                        <th>Price per Share</th>
                        <th>Current Value</th>
                        <th>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment, index) => (
                        <tr key={index}>
                            <td>{investment.name}</td>
                            <td>{investment.ticker}</td>
                            <td>{investment.numShares}</td>
                            <td>${investment.sharePrice}</td>
                            <td>${Number(investment.sharePrice * investment.numShares).toFixed(2)}</td>
                            <td><button onClick={() => this.sellShare(investment.ticker)}>Sell A Share</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

InvestmentsTable.propTypes = {
    popUp: PropTypes.func.isRequired,
    updateInvestments: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    investments: PropTypes.arrayOf(PropTypes.object).isRequired,
};