import React from 'react';
import Plot from 'react-plotly.js';

export default class PortfolioGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const values = [800.00, 823.13, 891.22, 903.11];
        const dates = ['2021-01-31', '2021-02-28', '2021-03-31', '2021-04-08'];

        return (
            <Plot className="graph"
                data={[
                    {
                        x: dates,
                        y: values,
                        type: 'scatter',
                        mode: 'lines',
                        text: values,
                        hovertemplate: "<b>£%{y}</b>"
                        + "<extra></extra>"
                    }
                ]}

                layout={{             
                    hovermode: 'closest',
                    hoverlabel: { bgcolor: "#FFF" },
                    margin: {l: 50, r: 50, b: 50, t: 10},
                }}

                useResizeHandler={true}
                config={{displayModeBar: false}}
                style={{width: '100%'}}
            />
        );
    }
}
