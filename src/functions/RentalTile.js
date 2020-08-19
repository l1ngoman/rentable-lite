import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import moment from 'moment';

const RentalTile = (props) => {
    const { rental } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-2 border-bottom border-left border-right p-1'>
                <a href={`/Rentals/${rental.rental_id}`}>{rental.rental_order_number}</a>
                </div>
            <div className='col-4 border-bottom border-right text-center p-1'>
                <a href={`/Customers/${rental.customer_id}`}>{`${rental.last_name}, ${rental.first_name}`}</a>
            </div>
            <div className='col-2 border-bottom border-right text-center p-1'>{moment(rental.rental_date).format('YYYY-MM-DD')}</div>
            <div className='col-2 border-bottom border-right text-center p-1'>{rental.status}</div>
            <div className='col-2 border-bottom border-right text-center p-1'>
                {(rental.pickup_id)
                    ?   <a href={`/Pickups/${rental.pickup_id}`}>{rental.pickup_order_number}</a>
                    :   'N/A'}
            </div>
        </div>
    );
};

export default RentalTile;