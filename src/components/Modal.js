import React from 'react';

export default class Modal extends React.Component {
    render() {
        const {closeFunc, title, children} = this.props;

        return (
            <div className="modal-background">
                <div className="modal">
                    <div className="modal-header">
                        <h1>{title}</h1>
                        <button onClick={closeFunc} className="modal-close"><i className="fa fa-times"></i></button>
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        );
        
    }
}