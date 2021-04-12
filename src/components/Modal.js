import React from 'react';

export default class Modal extends React.Component {

    render() {
        const {title, subtitle, visible, closeFunc, children} = this.props;

        if(!visible){
            return null;
        }

        return (
            <div className="modal-background">
                <div className="modal">
                    <div className="modal-header">
                        <h1>{title}</h1>
                        <h2>{subtitle}</h2>
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