import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

const RentalTile = (props) => {
    const { rental } = props;
    return (
        <Row className='no-gutters justify-content-center border border-dark'>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Rental #: </Col>
            <Col xs={8} sm={3} className='text-center p-1'>
                <a href={`/Rentals/${rental.rental_id}`}>{rental.rental_number}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Customer: </Col>
            <Col xs={8} sm={3} className='text-center p-1'>
                <a href={`/Customers/${rental.customer_id}`}>{`${rental.last_name}, ${rental.first_name}`}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Date: </Col>
            <Col xs={8} sm={3}  className='text-center p-1'>
                {moment(rental.delivery_date).format('YYYY-MM-DD')}
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Status: </Col>
            <Col xs={8} sm={3} className='text-center p-1'>
                {rental.rental_status}
            </Col>
        </Row>
    );
};

export default RentalTile;