import React from 'react';
import Plot from 'react-plotly.js';

export default class OptimiseGraph extends React.Component {

    render = () => {
        const {settings, portfolios, openPortfolio} = this.props;
        
        const xEff = portfolios.filter(p => p.efficient).map(p => p[settings.x]);
        const yEff = portfolios.filter(p => p.efficient).map(p => p[settings.y]);
        const zEff = portfolios.filter(p => p.efficient).map(p => p[settings.z]);

        const xNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.x]);
        const yNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.y]);
        const zNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.z]);

        const effDataset = {
            customdata: portfolios,
            x: xEff,
            y: yEff,
            z: zEff,
            text: portfolios.map(portfolio => portfolio.asString),
            type: 'scatter3d',
            mode: 'markers',
            marker: {color: "gold", size: 5},
            hovertemplate: `<b>${settings.z}: %{z}%</b><br>`
                + `<b>${settings.x}: %{x}%</b><br>`
                + `<b>${settings.y}: %{y}%</b><br>`
                + `%{text}<br>`
                + `<b>Click for more details.</b>`
                + `<extra></extra>`
        }

        var notEffDataset = JSON.parse(JSON.stringify(effDataset));
        notEffDataset.x = xNotEff;
        notEffDataset.y = yNotEff;
        notEffDataset.z = zNotEff;
        notEffDataset.marker = {color: "blue", size: 5};

        return (
            <Plot className="graph grid-item"
                data={[effDataset, notEffDataset]}

                layout={{
                    title: 'Efficient Frontier',
                    scene: {
                        xaxis: { title: settings.x, autorange: "reversed"},
                        yaxis: { title: settings.y, autorange: "reversed" },  
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
                    showlegend: false
                }}

                onClick={(data) => {
                    // timeout to stop onclick firing multiple times bug
                    setTimeout(() => {
                        openPortfolio(data.points[0].customdata);
                    }, 125);
                }}

                useResizeHandler={true}
                config={{displayModeBar: false}}
                style={{margin: 'auto', width: '100%', maxWidth: '600px', height: '500px'}}
            />
        );
    }
}
