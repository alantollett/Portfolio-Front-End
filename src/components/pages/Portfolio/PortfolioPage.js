import PropTypes from 'prop-types';
import MyInvestments from './MyInvestments';
import MyPortfolio from './MyPortfolio';

export default function PortfolioPage(props){
    const {user, popUp} = props;

    return (
        <div className="portfolio wrapper">
            <MyPortfolio user={user}/>
            <MyInvestments user={user} popUp={popUp}/>
        </div>
    );
}

PortfolioPage.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};