import React from 'react';
import axios from 'axios';
import BuySharesForm from './BuySharesForm';
import InvestmentsTable from './InvestmentsTable';

export default class Investments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            buySharesVisible: false,
            sellSharesVisible: false,
            purchase: false,
            error: null,
            investments: null,
        };
    }

    componentDidMount(){        
        this.updateInvestments();
    }

    updateInvestments(){
        axios.get('http://localhost:80/data/investments', {
            headers: { Authorization: `Bearer ${this.props.user.token}`}
        }).then(res => {
            this.setState({investments: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    openModal = () => {
        this.setState({buySharesVisible: true});
    }

    closeModal = () => {
        this.setState({buySharesVisible: false});
        this.updateInvestments();
    }

    sellShare = (ticker) => {
        const {user, displaySuccess} = this.props;

        const investment = {
            ticker: ticker,
            numShares: -1
        }

        axios.post(`http://localhost:80/data/investments`, {investment}, {
            headers: { Authorization: `Bearer ${user.token}`}
        }).then((res) => {
            displaySuccess('Share(s) Sold Successfully');
            this.updateInvestments();
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => {
        const {investments, error, buySharesVisible} = this.state;
        const {user, displayError, displaySuccess} = this.props;

        if(error){
            return <div>{error.message}</div>
        } else{
            return (
                <div className="investments">

                    {buySharesVisible ? 
                        <BuySharesForm closeFunc={this.closeModal} user={user} displayError={displayError} displaySuccess={displaySuccess}/>
                    : null}

                    <h1>Investments</h1>
    
                    <div className="buttons">
                        <button onClick={() => this.openModal()}>Buy Share(s)</button>
                    </div>
    
                    {!investments ? <div>Downloading Investments Data...</div> : (
                        <InvestmentsTable investments={investments} sellShare={this.sellShare}/>
                    )}
                </div>
            );
        }
    }
}
