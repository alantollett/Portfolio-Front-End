import React from 'react';
import PropTypes from 'prop-types';
import Visualisation from './Visualisation';
import Settings from './Settings';

export default class Optimise3DPage extends React.Component {
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
                    <Settings updateSettings={this.updateSettings} popUp={popUp}/>

                    {settings ? 
                        <Visualisation
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

Optimise3DPage.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};
