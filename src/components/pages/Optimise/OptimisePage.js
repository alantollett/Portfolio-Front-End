import React from 'react';
import OptimiseGraph from './OptimiseGraph';
import OptimiseSettings from './OptimiseSettings';
import axios from 'axios';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            portfolios: null,
            error: null
        };
    }

    updateSettings = async (settings) => {
        // if(settings.tickers.size === 0 || !settings.x || !settings.y || !settings.z || !settings.colour) {
        if(settings.tickers.size === 0){
            this.props.displayError('You must select 1 or more tickers and a value for each axis.');
            return;
        }
        await this.setState({settings: settings});
        this.loadPortfolios(settings);
    }

    loadPortfolios(){
        this.setState({portfolios: null});
        const {settings} = this.state;

        // generate string of tickers separated by - for url params
        var tickers = "";
        settings.tickers.forEach(ticker => tickers += ticker + "-");
        tickers = tickers.substr(0, tickers.length - 1);

        // create a url param object with the tickers
        const params = new URLSearchParams();
        params.append('tickers', tickers);

        // request portfolio data
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
        const {user} = this.props;
        const {settings, portfolios, error} = this.state;

        if(error) {
            return <div>{error.message}</div>;
        } else {
            return (
                <div className="optimise wrapper">
                    <h1>Optimise</h1>
    
                    <div className="grid">
                        <OptimiseSettings updateSettings={this.updateSettings}/>
    
                        {settings ? 
                            (portfolios ? 
                                <OptimiseGraph className="graph" user={user} settings={settings} portfolios={portfolios}/>
                            :
                                <div className="loading">Downloading Stock Data...</div>
                            )
                        : null}    
                    </div>
                </div>
            );
        };
    }
}
