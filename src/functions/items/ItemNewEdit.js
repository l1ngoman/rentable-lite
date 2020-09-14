import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

const ItemNewEdit = (props) => {
    const { item, handleChange, handleClick } = props;
    const today = moment().format('YYYY-MM-DD');
    return (
        <Form>
            <Row className="justify-content-center">
                <Col xs={10} sm={8}>
                    <Form.Group controlId="itemFormItemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control name="item_name" type="input" value={item.item_name} placeholder="Item Name" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={8}>
                    <Form.Group controlId="itemFormDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="item_description" type="textarea" value={item.item_description} as="textarea" placeholder="Item Description" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="itemFormTrackingNumber">
                        <Form.Label>Tracking #</Form.Label>
                        <Form.Control name="tracking_number" type="input" value={item.tracking_number} placeholder="Tracking #" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="itemFormSerialNumber">
                        <Form.Label>Serial #</Form.Label>
                        <Form.Control name="serial_number" type="input" value={item.serial_number} placeholder="Serial #" onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="itemFormPurchaseDate">
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control name="purchase_date" type="date" value={(item.purchase_date) ? moment(item.purchase_date).format('YYYY-MM-DD') : today} placeholder="Purchase Date" onChange={handleChange}/>
                    </Form.Group>
                </Col>
                <Col xs={10} sm={6} md={5} lg={4}>
                    <Form.Group controlId="itemFormPurchase Cost">
                        <Form.Label>Purchase Cost</Form.Label>
                        <Form.Control name="purchase_cost" type="number" value={item.purchase_cost} placeholder="0.00" min='0.00' step='any' onChange={handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center pb-2">
                <Col xs={3} className='text-center'>
                    <Button variant="primary" type="submit" onClick={handleClick}>
                        Save Item
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ItemNewEdit;