import PropTypes from 'prop-types';
import visualisation from './visualisation.png';

export default function HomePage(props){
    const {openPage} = props;

    return (
        <div className="home wrapper">
            <h1>PORTFOLIO OPTIMISER</h1>
            <h2>Helping you to invest only in the market's most 
                <span className="blue"> optimal</span> porfolios...
            </h2>

            <img src={visualisation} alt="VisualisationImage"/>

            <button onClick={() => openPage('account')}>Start Investing Now!</button>
        </div>
    );
}

HomePage.propTypes = {
    openPage: PropTypes.func.isRequired,
};