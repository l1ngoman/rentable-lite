import React from 'react';

const OrderIndexHeader = (props) => {
    return (
        <div className='row no-gutters justify-content-center bg-light'>
            <div className='col-2 text-center font-weight-bold border-top border-right border-bottom border-left'>{props.orderType} #</div>
            <div className='col-4 text-center font-weight-bold border-top border-right border-bottom'>Customer</div>
            <div className='col-2 text-center font-weight-bold border-top border-right border-bottom'>Order Date</div>
            <div className='col-2 text-center font-weight-bold border-top border-right border-bottom'>Status</div>
            <div className='col-2 text-center font-weight-bold border-top border-right border-bottom'>
                {props.orderType === 'Rental' && 'Pickup #'}
                {props.orderType === 'Pickup' && 'Rental #'}
            </div>
        </div>
    );
};

export default OrderIndexHeader;