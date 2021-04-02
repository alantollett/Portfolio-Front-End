import React from 'react';
import Graph from './Graph';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations} = this.props;

        return (
            <div className="dashboard wrapper">
                <Graph className="graph"
                    error={error} 
                    portfolios={portfolios} 
                    expectedReturns={expectedReturns} 
                    standardDeviations={standardDeviations}
                />
            </div>
        );
    }
}
