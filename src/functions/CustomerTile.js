import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const CustomerTile = props => {
    const { customer } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-1 text-center border-bottom border-left'>
                <Button type='button' size='sm' variant='light' href={`/Customers/${customer.id}`}>
                    <FontAwesomeIcon icon={faFileAlt} />
                </Button>
            </div>
            <div className='col-3 border-bottom border-left p-1'>{customer.firstName} {customer.lastName}</div>
            <div className='col-3 border-bottom border-left p-1'>{`${customer.address1} ${customer.address2}`}</div>
            <div className='col-2 border-bottom border-left p-1'>{customer.phone}</div>
            <div className='col-3 border-bottom border-left border-right p-1'>{customer.email}</div>
        </div>
    );
};

export default CustomerTile;