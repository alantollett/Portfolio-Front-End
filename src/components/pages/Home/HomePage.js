import React from 'react';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        return (
            <div className="home wrapper">
                <h1>Optimal Investor</h1>
                <p>some content on this page...</p>
            </div>
        );
    }
}
