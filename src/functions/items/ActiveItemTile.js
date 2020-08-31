import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

const ActiveItemTile = (props) => {
    const { item } = props;
    return (
        <Row className={`justify-content-center border border-dark ${(props.item_id % 2 === 0) ? '' : 'bg-light'}`}>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Name: </Col>
            <Col xs={8} sm={4} className='text-center p-1'>
                <a href={`/Items/${item.item_id}`}>{item.item_name}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Rental #: </Col>
            <Col xs={8} sm={4} className='text-center p-1'>
                <a href={`/Rentals/${item.rental_id}`}>{item.rental_number}</a>
            </Col>
            <Col xs={4} className='font-weight-bold text-right d-sm-none p-1'>Out Since: </Col>
            <Col xs={8} sm={4} className='text-center p-1'>
                {moment(item.delivery_date).format('YYYY-MM-DD')}
            </Col>
        </Row>
    );
};

export default ActiveItemTile;