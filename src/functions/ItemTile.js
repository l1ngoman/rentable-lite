import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

const ItemTile = props => {
    const { item } = props;
    return (
        <Row className={`justify-content-center border-dark border-bottom border-left border-right ${(props.id % 2 == 0) ? '' : 'bg-light'}`}>
            <Col xs={12} className='d-md-none border-top border-dark'></Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none'>Name: </Col>
            <Col xs={6} sm={4} className='p-1'>
                <a href={`/Items/${item.id}`}>{item.name}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none'>Serial No: </Col>
            <Col xs={6} sm={4} className='text-center'>
                {item.serialNumber}
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none'>Location: </Col>
            <Col xs={6} sm={3} className='text-center p-1'>
                {(item.rental) &&
                    (item.rental.status === 'OPEN') ? <a href={`/Customers/${item.rental.customer.id}`}>{`${item.rental.customer.lastName}, ${item.rental.customer.firstName}`}</a> : 'In Stock'}
            </Col>
        </Row>
    );
};

export default ItemTile;