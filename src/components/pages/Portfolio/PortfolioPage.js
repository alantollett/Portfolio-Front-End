import React from 'react';
import PortfolioValue from './PortfolioValue';
import PortfolioGraph from './PortfolioGraph';

export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            range: 'max'
        };
    }

    changeRange = (range) => {
        this.setState({range: range});
        // change values passed to portfolio graph (i.e. iterate over investments and check start/end date)
    }

    render = () => {
        const {user, error, prices} = this.props;
        const {range} = this.state;

        if(error){
            return <div>{error.message}</div>
        }else if(!prices){
            return <div>Downloading Stock Data...</div>
        }else{
            return (
                <div className="portfolio wrapper">
                    <PortfolioValue user={user} prices={prices}/>
    
                    <div className="ranges">
                        <button onClick={() => this.changeRange('d')} className={range === 'd' ? "active" : "inactive"}>1D</button>
                        <button onClick={() => this.changeRange('w')} className={range === 'w' ? "active" : "inactive"}>1W</button>
                        <button onClick={() => this.changeRange('m')} className={range === 'm' ? "active" : "inactive"}>1M</button>
                        <button onClick={() => this.changeRange('y')} className={range === 'y' ? "active" : "inactive"}>1D</button>
                        <button onClick={() => this.changeRange('max')} className={range === 'max' ? "active" : "inactive"}>MAX</button>
                    </div>
                    
                    <PortfolioGraph/>
                </div>
            );
        }
    }
}






        // // back-end only stores and provides a list of investments,
        // // so parse it into useful data...
        // var currValue = 0;
        // var amntInvested = 0;

        // for(var investment of user.investments) {
        //     // if purchase add, else if sell then subtract
        //     if(investment.purchase === 1){
        //         amntInvested += investment.numShares * investment.sharePrice;
        //         currValue += investment.numShares * investment.sharePrice; // * currentPrice
        //     }else{
        //         var amntInvestedInTicker = 0;
        //         for(var invest of user.investments){
        //             if(invest.purchase === 1 && invest.ticker === investment.ticker) {
        //                 amntInvestedInTicker += invest.numShares * investment.sharePrice;
        //             } 
        //         }

        //         amntInvested -= (amntInvestedInTicker - (investment.numShares * investment.sharePrice));
        //         currValue -= investment.numShares * investment.sharePrice;
        //     }
        // };

        // const portfolio = {
        //     currValue: currValue,
        //     amntInvested: amntInvested,
        // }

        // user['portfolio'] = portfolio;
        // this.setState({token: token, user: user});