import React from 'react';
import PropTypes from 'prop-types';
import CompaniesSelect from '../../CompaniesSelect';

export default class Tickers extends React.Component {

    render = () => {
        const {tickers, handleChange, removeTicker} = this.props;

        return (
            <div className="tickers">
                <CompaniesSelect handleChange={handleChange}/>

                {Array.from(tickers).map((ticker, index) => 
                    <span className="ticker" key={index}>
                        {ticker} 
                        <button className="close-button" onClick={(e) => {
                            e.preventDefault();
                            removeTicker(ticker);
                        }}>
                            <i className="fa fa-times"/>
                        </button>
                    </span>
                )}
            </div>
        );
    }
}

Tickers.propTypes = {
    handleChange: PropTypes.func.isRequired,
    removeTicker: PropTypes.func.isRequired,
    tickers: PropTypes.object.isRequired
};
