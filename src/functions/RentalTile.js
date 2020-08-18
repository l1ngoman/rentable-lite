import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const RentalTile = (props) => {
    const { rental } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-1 text-center border-bottom border-left'>
                <Button type='button' size='sm' variant='light' href={`/Rentals/${rental.id}`}>
                    <FontAwesomeIcon icon={faFileAlt} />
                </Button>
            </div>
            <div className='col-3 border-bottom border-left p-1'>{rental.orderNumber}</div>
            <div className='col-4 border-bottom border-left p-1'>
                <a href={`/Customers/${rental.customer.id}`}>{`${rental.customer.lastName}, ${rental.customer.firstName}`}</a>
            </div>
            <div className='col-2 border-bottom border-left border-right text-center p-1'>{rental.status}</div>
            <div className='col-2 border-bottom border-left border-right text-center p-1'>
                {(rental.pickup)
                    ?   <a href={`/Pickups/${rental.pickup.id}`}>{rental.pickup.orderNumber}</a>
                    :   'N/A'}
            </div>
        </div>
    );
};

export default RentalTile;