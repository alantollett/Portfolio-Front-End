import React from 'react';
import Plot from 'react-plotly.js';

export default class OptimiseGraph extends React.Component {

    render = () => {
        const {settings, portfolios} = this.props;

        const x = portfolios.map(portfolio => portfolio[settings.x]);
        const y = portfolios.map(portfolio => portfolio[settings.y]);
        const z = portfolios.map(portfolio => portfolio[settings.z]);

        console.log(settings);

        return (
            <Plot className="graph grid-item"
                data={[
                    {
                        x: x,
                        y: y,
                        z: z,
                        text: portfolios.map(portfolio => portfolio.asString),
                        type: 'scatter3d',
                        mode: 'markers',
                        marker: {color: 'red', size: 5},
                        hovertemplate: `<b>${settings.z}: %{z}%</b><br>`
                            + `<b>${settings.x}: %{x}%</b><br>`
                            + `<b>${settings.y}: %{y}%</b><br>`
                            + `%{text}`
                            + `<extra></extra>`
                    }
                ]}
                layout={{
                    title: 'Efficient Frontier',
                    scene: {
                        xaxis: { title: settings.x,},
                        yaxis: { title: settings.y },  
                        zaxis: { title: settings.z },   
                        camera: {
                            // change these based upon window width...?
                            center: {x: 0.05, y: 0, z: -0.2},
                            eye: {x: 1.3, y: 1.3, z: 0.1}
                        }
                    },      
                    margin: {l: 0, r: 0, b: 0, t: 0},
                    hovermode: 'closest',
                    hoverlabel: { bgcolor: "#FFF" },
                }}

                useResizeHandler={true}
                config={{displayModeBar: false}}
                style={{margin: 'auto', width: '100%', maxWidth: '600px', height: '500px'}}
            />
        );
    }
}
