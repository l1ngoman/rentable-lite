import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ItemIndexHeader = (props) => {
    return (
        <Row className='justify-content-center bg-secondary border border-dark d-none d-md-flex'>
            <Col xs={3} className='text-center font-weight-bold p-1'>Item Name</Col>
            <Col xs={3} className='text-center font-weight-bold p-1'>Description</Col>
            <Col xs={3} className='text-center font-weight-bold p-1'>Tracking #</Col>
            <Col xs={3} className='text-center font-weight-bold p-1'>Status</Col>
        </Row>
    );
};

export default ItemIndexHeader;