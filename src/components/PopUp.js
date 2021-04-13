import React from 'react';
import PropTypes from 'prop-types';

export default class PopUp extends React.Component {
    render() {
        const popUp = this.props.children;
        const closeEarly = this.props.closeEarly;

        return (
            <div className={popUp.error ? "pop-up red" : "pop-up green"}>
                {popUp.message}
                <button className="close-button" onClick={() => closeEarly(popUp)}>
                    <i className="fa fa-times"/>
                </button>
            </div>
        );
    }
}

PopUp.propTypes = {
    children: PropTypes.object.isRequired,
    closeEarly: PropTypes.func.isRequired
};