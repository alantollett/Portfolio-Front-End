import React from 'react';
import Plot from 'react-plotly.js';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations, expectedDividendYields} = this.props;

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
                            z: expectedDividendYields,
                            text: hoverTexts,
                            type: 'scatter3d',
                            mode: 'markers',
                            marker: {color: 'red', size: 5},
                            hovertemplate: "<b>Expected Return: %{y}%</b><br>"
                                + "<b>Standard Deviation: %{x}%</b><br>"
                                + "<b>Expected Dividend Yield: %{z}%</b><br>"
                                + "%{text}"
                                + "<extra></extra>"
                        }
                    ]}
                    layout={{
                        width: 600, 
                        height: 600, 
                        title: 'Efficient Frontier',
                        scene: {
                            xaxis: { title: "Standard Deviation (%)",},
                            yaxis: { title: "Expected Return (%)" },   
                            zaxis: { title: "Expected Dividend Yield (%)" },  
                            camera: {
                                eye: {x: 1.75, y: 1.75, z: 0.1}
                            }
                        },      
                        margin: {l: 0, r: 0, b: 0, t: 0},
                        hovermode: 'closest',
                        hoverlabel: { bgcolor: "#FFF" },
                        // config: { responsive: true }
                    }}
                />
            );
        }
    }
}
