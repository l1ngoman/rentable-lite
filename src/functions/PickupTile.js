import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import moment from 'moment';

const PickupTile = (props) => {
    const { pickup } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-2 border-bottom border-left border-right p-1'>
                <a href={`/Pickups/${pickup.pickup_id}`}>{pickup.pickup_order_number}</a>
            </div>
            <div className='col-4 border-bottom border-right text-center p-1'>
                <a href={`/Customers/${pickup.customer_id}`}>{`${pickup.last_name}, ${pickup.first_name}`}</a>
            </div>
            <div className='col-2 border-bottom border-right text-center p-1'>{moment(pickup.pickup_date).format('YYYY-MM-DD')}</div>
            <div className='col-2 border-bottom border-right text-center p-1'>{pickup.status}</div>
            <div className='col-2 border-bottom border-left border-right text-center p-1'>
                {(pickup.rental_id)
                    ?   <a href={`/Rentals/${pickup.rental_id}`}>{pickup.rental_order_number}</a>
                    :   '-'}
            </div>
        </div>
    );
};

export default PickupTile;