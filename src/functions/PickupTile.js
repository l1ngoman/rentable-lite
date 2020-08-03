import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const PickupTile = props => {
    const { pickup } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-1 text-center border-bottom border-left'>
                <Button type='button' size='sm' variant='light' href={`/Pickups/${pickup.id}`}>
                    <FontAwesomeIcon icon={faFileAlt} />
                </Button>
            </div>
            <div className='col-3 border-bottom border-left p-1'>{pickup.orderNumber}</div>
            <div className='col-4 border-bottom border-left p-1'>
                <a href={`/Customers/${pickup.customer.id}`}>{`${pickup.customer.lastName}, ${pickup.customer.firstName}`}</a>
            </div>
            <div className='col-2 border-bottom border-left border-right text-center p-1'>{pickup.status}</div>
            <div className='col-2 border-bottom border-left border-right text-center p-1'>
                {(pickup.rental)
                    ?   <a href={`/Rentals/${pickup.rentalID}`}>{pickup.rental.orderNumber}</a>
                    :   '-'}
            </div>
        </div>
    );
};

export default PickupTile;