import React from 'react';
import Plot from 'react-plotly.js';

export default class PortfolioGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        var {user, range} = this.props;

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
            minDate = new Date(user.worths[0].date);
        }

        var worths = user.worths.filter(worth => {
            const worthDate = new Date(worth.date);

            // filter if value is from the weekend...
            if(worthDate.getDay() == 0 || worthDate.getDay() == 6){
                return false;
            }

            // filter if out of the specified range
            return (worthDate >= minDate);
        });

        var dates = worths.map(worth => worth.date);
        var amounts = worths.map(worth => worth.amount);

        return (
            <Plot className="graph"
                data={[
                    {
                        x: dates,
                        y: amounts,
                        type: 'scatter',
                        mode: 'markers&lines',
                        text: amounts,
                        hovertemplate: "<b>%{x}<br>£%{y}</b>"
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
