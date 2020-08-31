import React from 'react';
import { Row, Col } from 'react-bootstrap';

const CustomerActiveItemIndexHeader = (props) => {
    return (
        <Row className='justify-content-center bg-secondary border border-dark d-none d-md-flex'>
            <Col xs={10} sm={8} md={4} className='text-center font-weight-bold p-1'>Item Name</Col>
            <Col xs={10} sm={8} md={4} className='text-center font-weight-bold p-1'>Rental #</Col>
            <Col xs={10} sm={8} md={4} className='text-center font-weight-bold p-1'>Out Since</Col>
        </Row>
    );
};

export default CustomerActiveItemIndexHeader;