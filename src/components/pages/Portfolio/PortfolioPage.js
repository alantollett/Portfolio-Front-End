import React from 'react';
import PortfolioValue from './PortfolioValue';
import PortfolioGraph from './PortfolioGraph';

export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        return (
            <div className="portfolio wrapper">
                <PortfolioValue/>

                <div className="ranges">
                    <button>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                    <button>1Y</button>
                    <button>MAX</button>
                </div>
                
                <PortfolioGraph/>
            </div>
        );
    }
}
