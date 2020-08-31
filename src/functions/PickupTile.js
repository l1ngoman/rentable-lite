import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

const PickupTile = (props) => {
    const { pickup } = props;
    return (
        <Row className='no-gutters justify-content-center border border-dark'>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Pickup #: </Col>
            <Col xs={8} sm={2} className='text-center p-1'>
                <a href={`/Pickups/${pickup.pickup_id}`}>{pickup.pickup_number}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Customer: </Col>
            <Col xs={8} sm={4} className='text-center p-1'>
                <a href={`/Customers/${pickup.customer_id}`}>{`${pickup.last_name}, ${pickup.first_name}`}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Date: </Col>
            <Col xs={8} sm={2} className='text-center p-1'>
                {moment(pickup.pickup_date).format('YYYY-MM-DD')}
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Status: </Col>
            <Col xs={8} sm={2} className='text-center p-1'>
                {pickup.pickup_status}
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Rental #: </Col>
            <Col xs={8} sm={2} className='text-center p-1'>
                {(pickup.rental_id)
                    ?   <a href={`/Rentals/${pickup.rental_id}`}>{pickup.rental_number}</a>
                    :   '-'}
            </Col>
        </Row>
    );
};

export default PickupTile;