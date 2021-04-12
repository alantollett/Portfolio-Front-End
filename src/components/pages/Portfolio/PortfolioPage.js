import React from 'react';
import Value from './Value';
import PortfolioGraph from './PortfolioGraph';
import Investments from './Investments';

export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            range: 'max'
        };
    }

    changeRange = (range) => {
        this.setState({range: range});
    }

    render = () => {
        const {user, displaySuccess} = this.props;
        const {range} = this.state;

        return (
            <div className="portfolio wrapper">
                <h1>Portfolio</h1>
                <Value user={user}/>
                <div className="ranges">
                    <button onClick={() => this.changeRange('d')} className={range === 'd' ? "active" : "inactive"}>1D</button>
                    <button onClick={() => this.changeRange('w')} className={range === 'w' ? "active" : "inactive"}>1W</button>
                    <button onClick={() => this.changeRange('m')} className={range === 'm' ? "active" : "inactive"}>1M</button>
                    <button onClick={() => this.changeRange('y')} className={range === 'y' ? "active" : "inactive"}>1Y</button>
                    <button onClick={() => this.changeRange('max')} className={range === 'max' ? "active" : "inactive"}>MAX</button>
                </div>
                <PortfolioGraph user={user} range={range}/>
                
                <Investments user={user} displaySuccess={displaySuccess}/>
            </div>
        );
    }
}