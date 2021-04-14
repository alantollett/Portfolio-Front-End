import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BuyModal from './BuyModal';
import InvestmentsTable from './InvestmentsTable';

export default class MyInvestments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false,
            error: null,
            investments: null,
        };
    }

    componentDidMount(){        
        this.updateInvestments();
    }

    updateInvestments = () => {
        this.setState({investments: null});
        axios.get('http://localhost:80/user/investments', {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({investments: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    openModal = () => {
        this.setState({modalVisible: true});
    }

    closeModal = () => {
        this.setState({modalVisible: false});
        this.updateInvestments();
    }

    render = () => {
        const {investments, error, modalVisible} = this.state;
        const {user, popUp} = this.props;

        if(error){
            return <div>{error.message}</div>
        } else{
            return (
                <div className="investments">
                    <h1>My Investments</h1>
                    {modalVisible ? 
                        <BuyModal closeFunc={this.closeModal} user={user} popUp={popUp}/>
                    : null}
    
                    <button className="buy-button" onClick={() => this.openModal()}>Buy Share(s)</button>
    
                    {!investments ? <div>Downloading Investments Data...</div> : (
                        <InvestmentsTable investments={investments} user={user} popUp={popUp} updateInvestments={this.updateInvestments}/>
                    )}
                </div>
            );
        }
    }
}

MyInvestments.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};