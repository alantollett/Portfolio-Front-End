import PropTypes from 'prop-types';

export default function PopUp(props){
    const popUp = props.children;
    const closeEarly = props.closeEarly;

    return (
        <div className="wrapper">
            <div className={popUp.error ? "pop-up red" : "pop-up green"}>
                {popUp.message}
                <button className="close-button" onClick={() => closeEarly(popUp)}>
                    <i className="fa fa-times"/>
                </button>
            </div>
        </div>
    );
}

PopUp.propTypes = {
    children: PropTypes.object.isRequired,
    closeEarly: PropTypes.func.isRequired
};