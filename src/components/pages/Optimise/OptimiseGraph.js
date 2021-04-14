import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import axios from 'axios';
import PortfolioModal from './PortfolioModal';

export default class OptimiseGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null,
            portfolio: null, // portfolio clicked
        };
    }

    // update the portfolios held by the state
    componentDidMount(){
        const {settings, user} = this.props;

        // generate string of tickers separated by - for url params
        var tickers = "";
        settings.tickers.forEach(ticker => tickers += ticker + "-");
        tickers = tickers.substr(0, tickers.length - 1);

        // create a url param object with the tickers
        const params = new URLSearchParams();
        params.append('tickers', tickers);

        // request portfolio data
        axios.get('http://localhost:80/data/portfolios', {
            headers: { Authorization: `Bearer ${user.token}`},
            params: params
        }).then(res => {
            this.setState({portfolios: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    // returns a list of datasets to be visualised (eff/noteff)
    getDatasets = () => {
        const {settings} = this.props;
        const {portfolios} = this.state;

        const xEff = portfolios.filter(p => p.efficient).map(p => p[settings.x]);
        const yEff = portfolios.filter(p => p.efficient).map(p => p[settings.y]);
        const zEff = portfolios.filter(p => p.efficient).map(p => p[settings.z]);

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

        var datasets = [effDataset];
        if(!settings.optimalOnly){
            const xNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.x]);
            const yNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.y]);
            const zNotEff = portfolios.filter(p => !p.efficient).map(p => p[settings.z]);
            
            var notEffDataset = JSON.parse(JSON.stringify(effDataset));
            notEffDataset.x = xNotEff;
            notEffDataset.y = yNotEff;
            notEffDataset.z = zNotEff;
            notEffDataset.marker = {color: "blue", size: 5};

            datasets.push(notEffDataset);
        }

        return datasets;
    }
    
    openPortfolio = (portfolio) => {
        this.setState({portfolio: portfolio});
    }

    closePortfolio = () => {
        this.setState({portfolio: null});
    }

    render = () => {
        const {settings, popUp, user} = this.props;
        const {portfolios, error, portfolio} = this.state;

        if(error) {
            return <div>{error.message}</div>;
        } else if(!portfolios) {
            return <div className="graph grid-item"><h1>Loading Portfolios...</h1></div>
        } else{
            return (
                <>
                {portfolio ? 
                    <PortfolioModal 
                        popUp={popUp}
                        closeFunc={this.closePortfolio} 
                        portfolio={portfolio} 
                        user={user}
                    /> 
                : null}
                
                <div className="graph grid-item">
                    <h1>Portfolios</h1>
                    <Plot 
                        data={this.getDatasets()}
        
                        layout={{
                            scene: {
                                xaxis: { title: settings.x, autorange: "reversed"},
                                yaxis: { title: settings.y, autorange: "reversed" },  
                                zaxis: { title: settings.z },   
                                camera: {
                                    // change these based upon window width...?
                                    center: {x: 0.05, y: 0, z: -0.15},
                                    eye: {x: 1.3, y: 1.3, z: 0.1}
                                }
                            },      
                            margin: {l: 0.1, r: 0.1, b: 0.1, t: 0.1},
                            hovermode: 'closest',
                            hoverlabel: { bgcolor: "#FFF" },
                            showlegend: false
                        }}
        
                        onClick={(data) => {
                            // timeout to stop onclick firing multiple times bug
                            setTimeout(() => {
                                this.openPortfolio(data.points[0].customdata);
                            }, 125);
                        }}
        
                        useResizeHandler={true}
                        config={{displayModeBar: false}}
                        style={{margin: 'auto', width: '100%', maxWidth: '600px', height: '500px'}}
                    />
                </div>
                </>
            );
        }
    }
}


OptimiseGraph.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};
