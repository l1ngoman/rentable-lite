import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';

const ActiveCustomerTile = (props) => {
    const { info } = props;
    return (
        <Container>
            <h5 className='text-center'>On Rent to Customer</h5>
            <hr className='w-50' />
            <Row className={`justify-content-center`}>
                <Col xs={4} sm={3} lg={2} className='font-weight-bold text-right p-1'>Rental #: </Col>
                <Col xs={8} sm={4} md={3} className='p-1'>
                    <a href={`/Rentals/${info.active_rental_id}`}>{info.active_rental_number}</a>
                </Col>
            </Row>
            <Row className={`justify-content-center`}>
                <Col xs={4} sm={3} lg={2} className='font-weight-bold text-right p-1'>Customer: </Col>
                <Col xs={8} sm={4} md={3} className='p-1'>
                    <a href={`/Customers/${info.active_customer_id}`}>{`${info.active_last_name}, ${info.active_first_name}`}</a>
                </Col>
            </Row>
            <Row className={`justify-content-center`}>
                <Col xs={4} sm={3} lg={2} className='font-weight-bold text-right p-1'>Out Since: </Col>
                <Col xs={8} sm={4} md={3} className='p-1'>
                    {moment(info.active_delivery_date).format('YYYY-MM-DD')}
                </Col>
            </Row>
        </Container>
    );
};

export default ActiveCustomerTile;