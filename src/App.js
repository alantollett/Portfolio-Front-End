import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null,
            expectedReturns: null,    // stored seperately for ease
            standardDeviations: null  // of use in the scatter plot
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/').then(res => {
            var portfolios = res.data;

            var expectedReturns = [];
            var standardDeviations = [];

            portfolios.forEach(portfolio => {
                expectedReturns.push(-portfolio.expectedReturn); // remove minus
                standardDeviations.push(portfolio.standardDeviation);
            });

            this.setState({
                portfolios: portfolios,
                expectedReturns: expectedReturns,
                standardDeviations: standardDeviations
            });
        }).catch(err => {
            this.setState({error: err});
        });
    }

    render = () => {
        const {error, portfolios, expectedReturns, standardDeviations} = this.state;

        if(error){
            return <div>{error.message}</div>
        }else if(!portfolios){
            return <div>Downloading Stock Data...</div>
        }else{
            return (
                <Plot
                    data={[
                        {
                            x: standardDeviations,
                            y: expectedReturns,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {color: 'red'},
                        }
                    ]}
                    layout={ {width: 500, height: 500, title: 'Efficient Frontier'} }
                />
            );
        }
    }
}
