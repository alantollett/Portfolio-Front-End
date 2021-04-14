import React from 'react';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        return (
            <div className="home wrapper">
                <h1>PORTFOLIO OPTIMISER</h1>
                <h2>Helping you to invest only in the market's most <span className="blue">optimal</span> porfolios...</h2>
                <video></video>
                <button>Start Investing Now!</button>
            </div>
        );
    }
}
