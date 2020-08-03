import React, { Component } from 'react';
import { getRentals } from '../api';
import RentalTile from '../functions/RentalTile';
import OrderIndexHeader from '../functions/OrderIndexHeader';

class Rentals extends Component
{
    constructor(props){
        super(props);

        this.state = {
            rentals: []
        };
    }

    render(){
        const { rentals } = this.state;
        return (
            <div>
                <h1 className='text-center'>Rental Orders</h1>
                <div className='container-fluid p-0'>
                    <OrderIndexHeader orderType='Rental'/>
                    {   (rentals.length > 0 )
                        ? rentals.map((el,i) => {
                            return (
                                <RentalTile key={i} rental={el}/>
                            );        
                        })
                        : "No Rentals found."
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        let { rentals } = this.state
        rentals = getRentals();
        this.setState({rentals})
    }
}

export default Rentals;