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
            var hoverTexts = [];
            portfolios.forEach(portfolio => hoverTexts.push(portfolio.asString));

            return (
                <Plot className="graph"
                    data={[
                        {
                            x: standardDeviations,
                            y: expectedReturns,
                            text: hoverTexts,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red'},
                            hovertemplate: "<b>Expected Return: %{y}%</b><br>"
                                + "<b>Standard Deviation: %{x}%</b><br>"
                                + "%{text}"
                                + "<extra></extra>"
                        }
                    ]}
                    layout={{
                        // width: 500, 
                        // height: 500, 
                        title: 'Efficient Frontier',
                        xaxis: { title: "Standard Deviation (%)" },
                        yaxis: { title: "Expected Return (%)" },        
                        hovermode: 'closest',
                        hoverlabel: { bgcolor: "#FFF" },
                        config: { responsive: true }
                    }}
                />
            );
        }
    }
}
