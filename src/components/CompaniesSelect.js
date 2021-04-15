import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

export default class CompaniesSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: null,
            error: null
        };
    }
    
    // load a list of possible companies (names and tickers) 
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_PATH}/data/companies`).then(res => {
            this.setState({companies: res.data});
        }).catch(err => {
            this.setState({error: err});
        });
    }

    render = () => {
        const {companies, error} = this.state;
        const {handleChange} = this.props;

        if(error){
            return <div>{error.message}</div>
        } else {
            return (
                <>
                <label>Company</label>
                {!companies ? 
                    <p>Loading Companies...</p>
                :
                    <>
                    <input name="ticker" list="companies" onChange={handleChange}/>
                    <datalist id="companies">
                        <option value="Select Ticker">Select Company</option>
                        {companies.map((c, index) => <option key={index} value={c.Symbol}>{c.Name}</option>)}
                    </datalist>
                    </>
                }
                </>
            );
        }
    }
}

CompaniesSelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
};




