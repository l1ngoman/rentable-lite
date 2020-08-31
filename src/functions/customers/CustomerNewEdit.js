import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CustomerNewEdit = (props) => {
    const { customer, handleChange, handleClick } = props;
    return (
        <Form>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="first_name" type="input" value={customer.first_name} placeholder="First" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="last_name" type="input" value={customer.last_name} placeholder="Last" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormAddress1">
                        <Form.Label>Address 1</Form.Label>
                        <Form.Control name="address_1" type="input" value={customer.address_1} placeholder="Address 1" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control name="address_2" type="input" value={customer.address_2} placeholder="Address 2" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={5} md={4} lg={4}>
                    <Form.Group controlId="customerFormCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control name="city" type="input" value={customer.city} placeholder="City" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={3} md={2} lg={2}>
                    <Form.Group controlId="customerFormState">
                        <Form.Label>State</Form.Label>
                        <Form.Control name="state" type="input" value={customer.state} placeholder="State" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={4} md={4} lg={2}>
                    <Form.Group controlId="customerFormZip">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control name="zip" type="input" value={customer.zip} placeholder="Zipcode" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control as="input" name="phone" type="tel" value={customer.phone} placeholder="Phone" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="customerFormEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control as="input" name="email" type="email" value={customer.email} placeholder="Email" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center pb-2">
                <Col xs={3} className='text-center'>
                    <Button variant="primary" type="submit" onClick={handleClick}>
                        Save Customer
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default CustomerNewEdit;