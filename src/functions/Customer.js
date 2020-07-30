import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Customers from '../containers/Customers';
import { getCustomer } from '../api';

class Customer extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound: true,
            readonly: (props.formType === 'Show') ? true : false,
            formType: props.formType,
            customer: {
                id: props.match.params.id,
            }
        };
    }

    render(){
        let { formType, customer, notFound, readonly, submitted } = this.state;
        return (
            <div className='container-fluid p-0'>
                <h1>Customer Show Page</h1>
                {(!notFound)  
                ?   <Container>
                        <Form>
                            <Row className="justify-content-center">
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormFirstName">
                                    {(formType !== 'Show') && 
                                        <Form.Label>First Name</Form.Label>}
                                        <Form.Control name="firstName" type="input" value={customer.firstName} placeholder="First" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormLastName">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Last Name</Form.Label>}
                                        <Form.Control name="lastName" type="input" value={customer.lastName} placeholder="Last" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormAddress1">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Address 1</Form.Label>}
                                        <Form.Control name="address1" type="input" value={customer.address1} placeholder="Address 1" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormAddress2">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Address 2</Form.Label>}
                                        <Form.Control name="address2" type="input" value={customer.address2} placeholder="Address 2" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs={10} sm={5} md={4} lg={3}>
                                    <Form.Group controlId="customerFormCity">
                                    {(formType !== 'Show') && 
                                        <Form.Label>City</Form.Label>}
                                        <Form.Control name="city" type="input" value={customer.city} placeholder="City" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={3} md={2}>
                                    <Form.Group controlId="customerFormState">
                                    {(formType !== 'Show') && 
                                        <Form.Label>State</Form.Label>}
                                        <Form.Control name="state" type="input" value={customer.state} placeholder="State" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={4} md={4} lg={3}>
                                    <Form.Group controlId="customerFormZip">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Zipcode</Form.Label>}
                                        <Form.Control name="zip" type="input" value={customer.zip} placeholder="Zipcode" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormPhone">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Phone</Form.Label>}
                                        <Form.Control as="input" name="phone" type="tel" value={customer.phone} placeholder="Phone" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="customerFormEmail">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Email</Form.Label>}
                                        <Form.Control as="input" name="email" type="email" value={customer.email} placeholder="Email" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* ATG:: DON'T RENDER BUTTON FOR THE SHOW PAGE */}
                            {(formType !== 'Show') &&
                            <Row className="justify-content-center pb-2">
                                <Col xs={3} className='text-center'>
                                    <Button variant="primary" type="submit" onClick={this.handleClick}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>}
                        </Form>
                    </Container>
                :   <Customers />
                }
                 {submitted && <Redirect to="/Customers" />}
            </div>
        );
    }

    componentDidMount() {
        let { customer } = this.state;
        const APICustomer = getCustomer(customer.id);
        (APICustomer)
        ? this.setState({customer: APICustomer, notFound: false})
        : this.setState({notFound: true})
    }

    handleChange = (e) => {
        let { customer } = this.state;
        customer[e.target.name] = e.target.value;
        this.setState({customer});
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.customer);
    }
}

export default Customer;