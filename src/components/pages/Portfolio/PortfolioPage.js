import React from 'react';
import PortfolioValue from './PortfolioValue';

export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        return (
            <div className="portfolio wrapper">
                <div className="value">
                    <PortfolioValue/>
                </div>
            </div>
        );
    }
}
