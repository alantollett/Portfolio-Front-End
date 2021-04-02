import React from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Account from './components/pages/Account';
import Graph from './components/Graph';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null,
            expectedReturns: null,
            standardDeviations: null,
            user: null,
            pageVisible: "Account",
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
        const {error, portfolios, expectedReturns, standardDeviations, user} = this.state;
        
        return (
            <>
            <Navigation user={user}/>
            <Account user={user}/>
            {/* <Graph error={error} portfolios={portfolios} expectedReturns={expectedReturns} standardDeviations={standardDeviations}/> */}
            </>
        )
    }
}
