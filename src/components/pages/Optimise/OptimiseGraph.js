import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default class OptimiseGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null,
            tickers: ['AAPL', 'TSLA', 'AMZN', 'KO', 'NKE', 'ZM', 'PEP', 'RIO']
        };
    }

    componentDidMount(){
        var tickers = "";
        this.state.tickers.forEach(ticker => tickers += ticker + "-");
        tickers = tickers.substr(0, tickers.length - 1);

        const params = new URLSearchParams();
        params.append('tickers', tickers);

        axios.get('http://localhost:80/data/portfolios', {
            headers: { Authorization: `Bearer ${this.props.user.token}`},
            params: params
        }).then(res => {
            this.setState({portfolios: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    render = () => {
        const {error, portfolios} = this.state;

        if(error){
            return <div>{error.message}</div>
        }else if(!portfolios){
            return <div className="loading">Downloading Stock Data...</div>
        }else{
            return (
                <Plot className="graph"
                    data={[
                        {
                            x: portfolios.map(portfolio => portfolio.standardDeviation),
                            y: portfolios.map(portfolio => portfolio.expectedDividendYield),
                            z: portfolios.map(portfolio => portfolio.expectedReturn),
                            text: portfolios.map(portfolio => portfolio.asString),
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
                        title: 'Efficient Frontier',
                        scene: {
                            xaxis: { title: "Standard Deviation (%)",},
                            yaxis: { title: "Expected Dividend Yield (%)" },  
                            zaxis: { title: "Expected Return (%)" },   
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
}
