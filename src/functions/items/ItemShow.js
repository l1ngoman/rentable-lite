import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';

const ItemShow = (props) => {
    const { item } = props;
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Name:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {item.item_name}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Description:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {item.item_description}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Tracking #:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {item.tracking_number}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Serial #:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {item.serial_number}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Purch. Date:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {moment(item.purchase_date).format('YYYY-MM-DD')}
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className='d-none d-sm-inline-block text-right font-weight-bold'>
                    Purch. Cost:
                </Col>
                <Col xs={8} sm={4} className='pl-1'>
                    {/* ATG:: COMPENSATING FOR KNOWN ISSUE WITH ROUNDING USING toFixed: https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding */}
                    {`$${(+(Math.round(+(item.purchase_cost + 'e2')) + 'e-2')).toFixed(2)}`}
                </Col>
            </Row>
        </Container>
    );
};

export default ItemShow;