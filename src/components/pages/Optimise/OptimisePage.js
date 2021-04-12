import React from 'react';
import OptimiseGraph from './OptimiseGraph';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render = () => {
        const {user} = this.props;
        return (
            <div className="optimise wrapper">
                <OptimiseGraph className="graph" user={user}/>
            </div>
        );
    }
}
