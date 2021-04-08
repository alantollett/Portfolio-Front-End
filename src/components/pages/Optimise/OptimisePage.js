import React from 'react';
import Graph from './OptimiseGraph';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations, expectedDividendYields} = this.props;

        return (
            <div className="optimise wrapper">
                <Graph className="graph"
                    error={error} 
                    portfolios={portfolios} 
                    expectedReturns={expectedReturns} 
                    standardDeviations={standardDeviations}
                    expectedDividendYields={expectedDividendYields}
                />
            </div>
        );
    }
}
