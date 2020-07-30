import React from 'react';

const CustomerTile = props => {
    const { customer } = props;
    return (
        <div className='row no-gutters justify-content-center'>
            <div className='col-2'>{customer.firstName}</div>
            <div className='col-2'>{customer.lastName}</div>
            <div className='col-2'>{`${customer.address1} ${customer.address2}`}</div>
            <div className='col-2'>{customer.phone}</div>
            <div className='col-2'>{customer.email}</div>
        </div>
    );
};

export default CustomerTile;