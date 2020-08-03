import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap';

const CustomerTile = props => {
    const { customer } = props;
    console.log(props.id);
    return (
        <Row className={`justify-content-center border-dark border-bottom border-left border-right ${(props.id % 2 == 0) ? '' : 'bg-light'}`}>
            <Col xs={12} className='d-md-none border-top border-dark'></Col>
            <Col xs={3} className='font-weight-bold text-right d-md-none'>Name: </Col>
            <Col xs={7} md={3} className='p-1'>
                <a href={`/Customers/${customer.id}`}>{customer.firstName} {customer.lastName}</a></Col>
            <Col xs={3} className='font-weight-bold text-right d-md-none'>Address: </Col>
            <Col xs={7} md={3} className='p-1'>{`${customer.address1} ${customer.address2}`}</Col>
            <Col xs={3} className='font-weight-bold text-right d-md-none'>Phone: </Col>
            <Col xs={7} md={2} className='p-1'>{customer.phone}</Col>
            <Col xs={3} className='font-weight-bold text-right d-md-none'>Email: </Col>
            <Col xs={7} md={3} className='p-1'>{customer.email}</Col>
        </Row>
    );
};

export default CustomerTile;