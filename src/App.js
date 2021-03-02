import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            portfolios: null
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/').then(res => {
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
            return <div>Downloading Stock Data...</div>
        }else{
            return (
                <ul>
                    {portfolios.map((portfolio, index) => 
                        <li key={index}>
                            {portfolio.weights} {portfolio.expectedReturn} {portfolio.standardDeviation}
                        </li>)}
                </ul>
            );
        }
    }
}
