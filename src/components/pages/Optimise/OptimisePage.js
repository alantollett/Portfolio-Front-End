import React from 'react';
import PropTypes from 'prop-types';
import OptimiseGraph from './OptimiseGraph';
import OptimiseSettings from './OptimiseSettings';

export default class OptimisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: null,
        };
    }

    updateSettings = (settings) => {
        if(settings.tickers.size === 0 || !settings.x || !settings.y || !settings.z) {
            this.props.popUp('You must select 1 or more tickers and a value for each axis.', true);
            return;
        }

        // set to null and update 5ms later to trigger reload
        this.setState({settings: null});
        setTimeout(() => {
            this.setState({settings: settings});
        }, 5);
    }

    render = () => {
        const {user, popUp} = this.props;
        const {settings} = this.state;

        return (
            <div className="optimise wrapper">    
                <div className="grid">
                    <OptimiseSettings updateSettings={this.updateSettings} popUp={popUp}/>

                    {settings ? 
                        <OptimiseGraph
                            user={user} 
                            settings={settings}
                            popUp={popUp}
                        />
                    : null}
                </div>
            </div>
        );
    }
}

OptimisePage.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};
