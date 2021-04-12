import React from 'react';

export default class InvestmentsTable extends React.Component {

    render = () => {
        const {investments, sellShare} = this.props;
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Number of Shares</th>
                    <th>Price per Share</th>
                    <th>Current Value</th>
                    <th>Sell</th>
                </tr>
                {investments.map(investment => (
                    <tr>
                        <td>{investment.name}</td>
                        <td>{investment.ticker}</td>
                        <td>{investment.numShares}</td>
                        <td>${investment.sharePrice}</td>
                        <td>${Number(investment.sharePrice * investment.numShares).toFixed(2)}</td>
                        <td><button onClick={() => sellShare(investment.ticker)}>Sell A Share</button></td>
                    </tr>
                ))}
            </table>
        );
    }
}