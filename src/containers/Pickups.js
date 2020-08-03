import React, { Component } from 'react';
import { getPickups } from '../api';
import PickupTile from '../functions/PickupTile';
import OrderIndexHeader from '../functions/OrderIndexHeader';

class Pickups extends Component
{
    constructor(props){
        super(props);

        this.state = {
            pickups: []
        };
    }

    render(){
        const { pickups } = this.state;
        return (
            <div>
                <h1 className='text-center'>Pickup Orders</h1>
                <div className='container-fluid p-0'>
                    <OrderIndexHeader orderType='Pickup'/> 
                    {   (pickups.length > 0 )
                        ? pickups.map((el,i) => {
                            return (
                                <PickupTile key={i} pickup={el}/>
                            );        
                        })
                        : "No Pickups found."
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        let { pickups } = this.state
        pickups = getPickups();
        this.setState({pickups})
    }
}

export default Pickups;