import PropTypes from 'prop-types';

export default function Navigation(props){
    return (
        <nav>
            <div className="wrapper"> 
                <button onClick={() => props.openPage("home")} className="home-button">
                    PORTFOLIO OPTIMISER
                </button>
                
                <div className="right">
                    {props.user ? 
                        <>
                            <button onClick={() => props.openPage("portfolio")}>My Portfolio</button>
                            <button onClick={() => props.openPage("optimise2d")} >Optimise 2D</button>
                            <button onClick={() => props.openPage("optimise3d")} >Optimise 3D</button>
                            <button onClick={() => props.logout()}>Logout</button>
                        </>
                    : 
                        <button onClick={() => props.openPage("account")}>Login</button>
                    }
                </div>
            </div>
        </nav>
    )
};

Navigation.propTypes = {
    openPage: PropTypes.func.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func
};