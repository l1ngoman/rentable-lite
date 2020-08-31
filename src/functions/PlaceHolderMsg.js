import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PlaceHolderMsg = (props) => {
    const { alert, message } = props;

    return (
        <Container className='p-0'>
            <Row className='no-gutters justify-content-center'>
                <Col xs={12} sm={10} md={8} className='text-center'>
                    <h5 className={`text-center alert-${alert} py-2`}>{message}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceHolderMsg;