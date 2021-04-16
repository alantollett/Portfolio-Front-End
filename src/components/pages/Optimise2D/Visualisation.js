import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import axios from 'axios';
import PortfolioModal from '../../PortfolioModal';

export default class Visualisation extends React.Component {
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
        params.append('riskWeighting', settings.riskWeighting);
        params.append('returnWeighting', settings.returnWeighting);

        // request portfolio data
        axios.get(`${process.env.REACT_APP_API_PATH}/data/portfolios2d`, {
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

        const xEff = portfolios.filter(p => p.efficient).map(p => 
            (p.standardDeviation * settings.riskWeighting) 
            + (p.priceToBook * (1 - settings.riskWeighting)));

        const yEff = portfolios.filter(p => p.efficient).map(p => 
            (p.expectedReturn * settings.returnWeighting) 
            + (p.expectedDividendYield * (1 - settings.returnWeighting)));

        const effDataset = {
            customdata: portfolios,
            x: xEff,
            y: yEff,
            text: portfolios.map(portfolio => portfolio.asString),
            type: 'scatter',
            mode: 'markers',
            marker: {color: "gold", size: 5},
            hovertemplate: `<b>Risk: %{x}%</b><br>`
                + `<b>Return: %{y}%</b><br>`
                + `%{text}<br>`
                + `<b>Click to buy portfolio.</b>`
                + `<extra></extra>`
        }

        var datasets = [effDataset];
        if(!settings.optimalOnly){
            const xNotEff = portfolios.filter(p => !p.efficient).map(p => 
                (p.standardDeviation * settings.riskWeighting) 
                + (p.priceToBook * (1 - settings.riskWeighting)));
    
            const yNotEff = portfolios.filter(p => !p.efficient).map(p => 
                (p.expectedReturn * settings.returnWeighting) 
                + (p.expectedDividendYield * (1 - settings.returnWeighting)));
            
            var notEffDataset = JSON.parse(JSON.stringify(effDataset));
            notEffDataset.x = xNotEff;
            notEffDataset.y = yNotEff;
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
        const {popUp, user} = this.props;
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
                            margin: {l: 60, r: 0, b: 60, t: 0},
                            hovermode: 'closest',
                            hoverlabel: { bgcolor: "#FFF" },
                            showlegend: false,
                            xaxis: {title: 'Risk'},
                            yaxis: {title: 'Return'},
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


Visualisation.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};
