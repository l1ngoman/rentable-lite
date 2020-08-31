import React from 'react';
import { Row, Col } from 'react-bootstrap';

const OrderIndexHeader = (props) => {
    let colSize = (props.orderType === 'Pickup') ? 2 : 3;

    return (
        <Row className='no-gutters justify-content-center bg-secondary border border-dark d-none d-sm-flex'>
            <Col xs={colSize} className='text-center font-weight-bold p-1'>{props.orderType} #</Col>
            <Col xs={3} className='text-center font-weight-bold p-1'>Customer</Col>
            <Col xs={colSize} className={`text-center font-weight-bold p-1`}>Order Date</Col>
            <Col xs={colSize} className={`text-center font-weight-bold p-1`}>Status</Col>
            {props.orderType === 'Pickup' &&
                <Col xs={2} className='text-center font-weight-bold p-1'>
                    {props.orderType === 'Rental' && 'Pickup #'}
                    {props.orderType === 'Pickup' && 'Rental #'}
                </Col>}
        </Row>
    );
};

export default OrderIndexHeader;