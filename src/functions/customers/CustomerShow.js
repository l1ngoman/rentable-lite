import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CustomerShow = (props) => {
    const { customer } = props;
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Name:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {`${customer.first_name} ${customer.last_name}`}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Address:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {customer.address_1}
                </Col>
            </Row>
            {(customer.address_2 !== '') &&
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'></Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {customer.address_2}
                </Col>
            </Row>}
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'></Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {`${customer.city}, ${customer.state} ${customer.zip}`}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Phone:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {`${customer.phone}`}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Email:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {`${customer.email}`}
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerShow;