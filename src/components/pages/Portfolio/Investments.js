import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import BuyModal from './BuyModal';
import InvestmentsTable from './InvestmentsTable';

export default class Investments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            buyModalVisible: false,
            error: null,
            investments: null,
        };
    }

    componentDidMount(){        
        this.updateInvestments();
    }

    updateInvestments(){
        axios.get('http://localhost:80/user/investments', {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({investments: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    openModal = () => {
        this.setState({buyModalVisible: true});
    }

    closeModal = () => {
        this.setState({buyModalVisible: false});
        this.updateInvestments();
    }

    sellShare = (ticker) => {
        const {user, popUp} = this.props;
        const investment = {ticker: ticker, numShares: -1};

        axios.post(`http://localhost:80/user/investments`, {investment}, {
            headers: { Authorization: `Bearer ${user.token}`}
        }).then((res) => {
            popUp('Share(s) Sold Successfully', false);
            this.updateInvestments();
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => {
        const {investments, error, buyModalVisible} = this.state;
        const {user, popUp} = this.props;

        if(error){
            return <div>{error.message}</div>
        } else{
            return (
                <div className="investments">
                    <h1>My Investments</h1>
                    {buyModalVisible ? 
                        <BuyModal closeFunc={this.closeModal} user={user} popUp={popUp}/>
                    : null}
    
                    <button className="buy-button" onClick={() => this.openModal()}>Buy Share(s)</button>
    
                    {!investments ? <div>Downloading Investments Data...</div> : (
                        <InvestmentsTable investments={investments} sellShare={this.sellShare}/>
                    )}
                </div>
            );
        }
    }
}

Investments.propTypes = {
    popUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};