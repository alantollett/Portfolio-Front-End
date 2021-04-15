import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import axios from 'axios';

export default class MyPortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            worths: null,
            range: 'max'
        };
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_PATH}/user/worths`, {
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

            // remove if value is from the weekend...
            if(worthDate.getDay() === 0 || worthDate.getDay() === 6){
                return false;
            }

            // filter if out of the specified range
            return (worthDate >= minDate);
        });
    } 

    changeRange = (range) => this.setState({range: range});

    render = () => {
        const {error, range, worths} = this.state;

        if(error){
            return <div>{error.message}</div>
        } else if (!worths){
            return <><h1>My Portfolio</h1><h2>Loading...</h2></>;
        } else if(worths.length === 0){
            return <><h1>My Portfolio</h1><h2>No data yet...</h2></>;
        } else{
            // get data filtered by the range
            const filteredWorths = this.getWorthsFiltered();
            var dates = filteredWorths.map(worth => new Date(worth.date));
            var amounts = filteredWorths.map(worth => worth.amount);

            // color based upon whether value has gone up/down since start of range
            const color = amounts[0] > amounts[amounts.length - 1] ? "red" : "green";

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
                            line: {color: color},
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

MyPortfolio.propTypes = {
    user: PropTypes.object.isRequired
};
