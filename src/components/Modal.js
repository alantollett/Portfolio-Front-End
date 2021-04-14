import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
    render() {
        const {closeFunc, title, children} = this.props;

        return (
            <div className="modal-background">
                <div className="modal">
                    <div className="modal-header">
                        <h1 style={{color: "white", margin:"0"}}>{title}</h1>
                        <button onClick={closeFunc} className="close-button"><i className="fa fa-times"></i></button>
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        );
        
    }
}

Modal.propTypes = {
    closeFunc: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
};