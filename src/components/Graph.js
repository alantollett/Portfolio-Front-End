import React from 'react';
import Plot from 'react-plotly.js';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations} = this.props;

        if(error){
            return <div>{error.message}</div>
        }else if(!portfolios){
            return <div>Downloading Stock Data...</div>
        }else{
            return (
                <Plot className="graph"
                    data={[
                        {
                            x: standardDeviations,
                            y: expectedReturns,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red'},
                        }
                    ]}
                    layout={ {width: 500, height: 500, title: 'Efficient Frontier'} }
                />
            );
        }
    }
}
