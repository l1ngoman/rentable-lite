import React, { Component } from 'react';
import { getCustomers } from '../api';
import CustomerTile from '../functions/CustomerTile';

class Customers extends Component
{
    constructor(props){
        super(props);

        this.state = {
            customers: []
        };
    }

    render(){
        const { customers } = this.state;
        return (
            <div>
                <h1 className='text-center'>All Customers</h1>
                <div className='container-fluid p-0'>
                    <div className='row no-gutters justify-content-center bg-light'>
                        <div className='col-1 bg-light border'></div>
                        <div className='col-3 text-center font-weight-bold border-top border-right border-bottom'>Name</div>
                        <div className='col-3 text-center font-weight-bold border-top border-right border-bottom'>Address</div>
                        <div className='col-2 text-center font-weight-bold border-top border-right border-bottom'>Phone</div>
                        <div className='col-3 text-center font-weight-bold border-top border-right border-bottom'>Email</div>
                    </div>
                    {   (customers.length > 0 )
                        ? customers.map((el,i) => {
                            return (
                                <CustomerTile key={i} customer={el}/>
                            );        
                        })
                        : "No Customers found."
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        let { customers } = this.state
        customers = getCustomers();
        this.setState({customers})
    }
}

export default Customers;