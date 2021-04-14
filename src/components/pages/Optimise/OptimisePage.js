import React from 'react';
import PropTypes from 'prop-types';
import OptimiseGraph from './OptimiseGraph';
import OptimiseSettings from './OptimiseSettings';
import PortfolioModal from './PortfolioModal';
import axios from 'axios';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: null,
            portfolios: null,
            error: null,
            portfolio: null,
        };
    }

    updateSettings = async (settings) => {
        // if(settings.tickers.size === 0 || !settings.x || !settings.y || !settings.z || !settings.colour) {
        if(settings.tickers.size === 0){
            this.props.popUp('You must select 1 or more tickers and a value for each axis.', true);
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

    openPortfolio = (portfolio) => {
        this.setState({portfolio: portfolio});
    }

    closePortfolio = () => {
        this.setState({portfolio: null});
    }

    render = () => {
        const {user, popUp} = this.props;
        const {settings, portfolios, error, portfolio} = this.state;

        if(error) {
            return <div>{error.message}</div>;
        } else {
            return (
                <div className="optimise wrapper">
                    {portfolio ? 
                        <PortfolioModal 
                            popUp={popUp}
                            closeFunc={this.closePortfolio} 
                            portfolio={portfolio} 
                            user={user}/> 
                    : null}
    
                    <div className="grid">
                        <OptimiseSettings updateSettings={this.updateSettings}/>
    
                        {settings ? 
                            (portfolios ? 
                                <OptimiseGraph className="graph" 
                                    user={user} 
                                    settings={settings} 
                                    portfolios={portfolios}
                                    openPortfolio={this.openPortfolio}
                                />
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

OptimisePage.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};
