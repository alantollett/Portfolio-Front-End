import React from 'react';
import OptimiseGraph from './OptimiseGraph';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        return (
            <div className="optimise wrapper">
                <OptimiseGraph className="graph"/>
            </div>
        );
    }
}
