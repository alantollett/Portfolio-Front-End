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
                            y: expectedDividendYields,
                            z: expectedReturns,
                            text: hoverTexts,
                            type: 'scatter3d',
                            mode: 'markers',
                            marker: {color: 'red', size: 5},
                            hovertemplate: "<b>Expected Return: %{z}%</b><br>"
                                + "<b>Standard Deviation: %{x}%</b><br>"
                                + "<b>Expected Dividend Yield: %{y}%</b><br>"
                                + "%{text}"
                                + "<extra></extra>"
                        }
                    ]}
                    layout={{
                        // width: 600, 
                        // height: 600, 
                        title: 'Efficient Frontier',
                        scene: {
                            xaxis: { title: "Standard Deviation (%)",},
                            yaxis: { title: "Expected Dividend Yield (%)" },  
                            zaxis: { title: "Expected Return (%)" },   
                            camera: {
                                center: {x: 0, y: 0, z: -0.2},
                                eye: {x: 1.3, y: 1.3, z: 0.1}
                            }
                        },      
                        margin: {l: 0, r: 0, b: 0, t: 0},
                        hovermode: 'closest',
                        hoverlabel: { bgcolor: "#FFF" },
                        config: { responsive: true },
                    }}
                    config={{displayModeBar: false}}
                />
            );
        }
    }
}
