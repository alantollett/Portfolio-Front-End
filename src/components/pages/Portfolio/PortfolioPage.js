import React from 'react';
import PropTypes from 'prop-types';

import PortfolioGraph from './PortfolioGraph';
import Investments from './Investments';

export default class PortfolioPage extends React.Component {
    render = () => {
        const {user, popUp} = this.props;

        return (
            <div className="portfolio wrapper">
                <PortfolioGraph user={user}/>
                <Investments user={user} popUp={popUp}/>
            </div>
        );
    }
}

PortfolioPage.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};