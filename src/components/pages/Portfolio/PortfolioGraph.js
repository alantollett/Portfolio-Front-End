import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default class PortfolioGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            worths: null,
            range: 'max'
        };
    }

    componentDidMount(){    
        this.updateWorths();
    }

    updateWorths = () => {
        axios.get('http://localhost:80/user/worths', {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({worths: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    getWorthsFiltered = () => {
        const {worths, range} = this.state;

        // get the minimum date of visible worth data points based upon range
        var minDate = new Date();
        minDate.setHours(0);
        minDate.setMinutes(0);
        minDate.setSeconds(0);

        if(range === 'w'){
            const daysAfterMonday = minDate.getDay() - 1;
            minDate.setDate(minDate.getDate() - daysAfterMonday);
        } else if(range === 'm'){
            const daysAfterFirst = minDate.getDate() - 1;
            minDate.setDate(minDate.getDate() - daysAfterFirst);
        } else if(range === 'y'){
            minDate.setMonth(0);
            minDate.setDate(1);
        }

        // set min date to start of user's account if range is too high
        if(range === 'max'){
            minDate = new Date(worths[0].date);
        }

        return worths.filter(worth => {
            const worthDate = new Date(worth.date);

            // filter if value is from the weekend...
            if(worthDate.getDay() === 0 || worthDate.getDay() === 6){
                return false;
            }

            // filter if out of the specified range
            return (worthDate >= minDate);
        });
    } 

    changeRange = (range) => {
        this.setState({range: range});
        this.updateWorths();
    }

    render = () => {
        const {error, range} = this.state;

        if(error){
            return <div>{error.message}</div>
        } else if (!this.state.worths){
            return <div>Downloading Portfolio Data...</div>;
        } else if(this.state.worths.length === 0){
            return (
                <>
                <h1>My Portfolio</h1>
                <h2>No data yet...</h2>
                </>
            );
        
        } else{
            const worths = this.getWorthsFiltered();
            var dates = worths.map(worth => worth.date);
            var amounts = worths.map(worth => worth.amount);

            return (
                <>
                <h1>My Portfolio</h1>
                <h2>${worths[worths.length - 1].amount}</h2>
    
                <div className="ranges">
                    <button onClick={() => this.changeRange('d')} className={range === 'd' ? "active" : null}>1D</button>
                    <button onClick={() => this.changeRange('w')} className={range === 'w' ? "active" : null}>1W</button>
                    <button onClick={() => this.changeRange('m')} className={range === 'm' ? "active" : null}>1M</button>
                    <button onClick={() => this.changeRange('y')} className={range === 'y' ? "active" : null}>1Y</button>
                    <button onClick={() => this.changeRange('max')} className={range === 'max' ? "active" : null}>MAX</button>
                </div>
    
                <Plot className="graph"
                    data={[
                        {
                            x: dates,
                            y: amounts,
                            type: 'scatter',
                            mode: 'markers&lines',
                            text: amounts,
                            hovertemplate: "<b>%{x}<br>$%{y}</b>"
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
                </>
            );
        }
    }
}

PortfolioGraph.propTypes = {
    user: PropTypes.object.isRequired
};
