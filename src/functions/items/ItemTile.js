import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ItemTile = (props) => {
    const { item } = props;
    return (
        <Row className={`justify-content-center border border-dark ${(item.item_status === 'ON HAND') ? 'alert-info' : 'alert-secondary'}`}>
            <Col xs={12} className='d-md-none border-top border-dark'></Col>
            <Col xs={3} className='font-weight-bold text-right d-sm-none'>Name: </Col>
            <Col xs={6} sm={3} className='p-1'>
                <a href={`/Items/${item.item_id}`}>{item.item_name}</a>
            </Col>
            <Col xs={3} className='font-weight-bold text-right d-sm-none'>Description: </Col>
            <Col xs={6} sm={3} className='text-center'>
                {item.item_description}
            </Col>
            <Col xs={3} className='font-weight-bold text-right d-sm-none'>Tracking #: </Col>
            <Col xs={6} sm={3} className='text-center'>
                {item.tracking_number}
            </Col>
            <Col xs={3} className='font-weight-bold text-right d-sm-none'>Status: </Col>
            <Col xs={6} sm={3} className='text-center p-1'>
                {item.item_status}
            </Col>
        </Row>
    );
};

export default ItemTile;