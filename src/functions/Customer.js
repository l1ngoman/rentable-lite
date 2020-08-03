import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Customers from '../containers/Customers';
import RentalTile from '../functions/RentalTile';
import PickupTile from '../functions/PickupTile';
import OrderIndexHeader from './OrderIndexHeader';
import { getCustomer } from '../api';

class Customer extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound:               true,
            submitted:              false,
            formType:               props.formType,
            readonly:               (props.formType === 'Show') ? true : false,
            showActiveOrders:       true,
            showOrderHistory:       false,
            showPickups:            false,
            customerOpenRentals:    [],
            customerClosedRentals:  [],
            customerPickups:        [],
            customer: {
                id:         (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                firstName:  '',
                lastName:   '',
                address1:   '',
                address2:   '',
                city:       '',
                state:      '',
                zip:        '',
                phone:      '',
                email:      ''        
            }
        };
    }

    render(){
        let { formType, customer, customerOpenRentals, customerClosedRentals, customerPickups, notFound, readonly, submitted, showActiveOrders, showOrderHistory, showPickups } = this.state;
        return (
            <div className='container-fluid p-0'>
                <div className='row no-gutters justify-content-center align-items-center'>
                    <div className='col-sm-3'></div>
                    <div className='col-12 col-sm-6'>
                        <h1 className='text-center'>{(formType === 'New') ? 'Add Customer' : `${customer.firstName} ${customer.lastName}`}</h1>
                    </div>
                    <div className='col-12 col-sm-1 text-center'>
                        {(formType !== 'New')
                            &&  <Button type='button' size='lg' variant='light' onClick={() => this.handleSave(formType)}>
                                    {(formType !== 'Edit')
                                    ?   <FontAwesomeIcon icon={faEdit} />
                                    :   <FontAwesomeIcon icon={faSave} />}
                                </Button>
                        }
                    </div>
                    <div className='col-sm-2'></div>
                </div>
                <hr className='w-50'/>
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
                                <Col xs={10} sm={5} md={4} lg={4}>
                                    <Form.Group controlId="customerFormCity">
                                    {(formType !== 'Show') && 
                                        <Form.Label>City</Form.Label>}
                                        <Form.Control name="city" type="input" value={customer.city} placeholder="City" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={3} md={2} lg={2}>
                                    <Form.Group controlId="customerFormState">
                                    {(formType !== 'Show') && 
                                        <Form.Label>State</Form.Label>}
                                        <Form.Control name="state" type="input" value={customer.state} placeholder="State" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={4} md={4} lg={2}>
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
                        <hr/>
                        <Container>
                            <Row className='justify-content-center mb-3'>
                                <Col xs={3} className='text-center'>
                                    <Button onClick={() => this.toggleOrderView('OPEN')}>
                                        <span className='d-none d-md-block'>Show Active Rentals</span>
                                        <span className='d-block d-md-none'>Active</span>
                                    </Button>
                                </Col>
                                <Col xs={3} className='text-center'>
                                    <Button onClick={() => this.toggleOrderView('CLOSED')}>
                                        <span className='d-none d-md-block'>Show Rental History</span>
                                        <span className='d-block d-md-none'>History</span>
                                    </Button>
                                </Col>
                                <Col xs={3} className='text-center'>
                                    <Button onClick={() => this.toggleOrderView('PICKUP')}>
                                        <span className='d-none d-md-block'>Show All Pickups</span>
                                        <span className='d-block d-md-none'>Pickups</span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col xs={12}>
                                    {showActiveOrders && (
                                        (customerOpenRentals.length > 0)
                                        ?   <div className='container-fluid p-0'>
                                                <OrderIndexHeader orderType='Rental'/>
                                                {customerOpenRentals.map((el,i) => {
                                                    return <RentalTile key={i} rental={el} />
                                                })}
                                            </div>
                                        :   <h5 className='text-center'>No Active Rental Orders</h5>
                                    )}
                                    {showOrderHistory && (
                                        (customerClosedRentals.length > 0)
                                        ?   <div className='container-fluid p-0'>
                                                <OrderIndexHeader orderType='Rental'/>
                                                {customerClosedRentals.map((el,i) => {
                                                    return <RentalTile key={i} rental={el} />
                                                })}
                                            </div>
                                        :   <h5 className='text-center'>No Rental Order History</h5>
                                    )}
                                    {showPickups && (
                                        (customerPickups.length > 0)
                                        ?   <div className='container-fluid p-0'>
                                                <OrderIndexHeader orderType='Pickup'/>
                                                {customerPickups.map((el,i) => {
                                                    return <PickupTile key={i} pickup={el} />
                                                })}
                                            </div>
                                        :   <h5 className='text-center'>No Pickup History</h5>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                :   <Customers />
                }
                {submitted && <Redirect to="/Customers" />}
            </div>
        );
    }

    componentDidMount() {
        let { formType, customer, customerOpenRentals, customerClosedRentals } = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            const resp = getCustomer(customer.id);
            const APICustomer   = resp.customer;
            const APIRentals    = resp.customerRentals;
            const APIPickups    = resp.customerPickups;

            for( let el in APIRentals) {
                APIRentals[el]['customer'] = APICustomer;

                if(APIRentals[el].status === 'OPEN') {
                    customerOpenRentals.push(APIRentals[el]);
                } else {
                    customerClosedRentals.push(APIRentals[el]);     
                }
            }

            (APICustomer)
            ?   this.setState({
                    customer: APICustomer, 
                    customerOpenRentals, 
                    customerClosedRentals, 
                    customerPickups: APIPickups, 
                    notFound: false
                })
            :   this.setState({notFound: true})
        }
    }

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { customer } = this.state;
        customer[e.target.name] = e.target.value;
        this.setState({customer});
    }

    // ATG:: FUNCTION TO CREATE A NEW OBJECT
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.customer);
        this.setState({submitted: true})
    }

    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (formType) => {
        console.log(this.state.customer);

        if(formType === 'Show'){
            this.setState({formType: 'Edit', readonly: false});
        } else if(formType === 'Edit') {
            // save function here
            this.setState({formType: 'Show', readonly: true});
        }
    }

    toggleOrderView = (orderType) => {
        switch(orderType){
            case 'CLOSED':
                this.setState({showActiveOrders: false, showOrderHistory: true, showPickups: false}); break;
            case 'PICKUP':
                this.setState({showActiveOrders: false, showOrderHistory: false, showPickups: true}); break;
            default:
                this.setState({showActiveOrders: true, showOrderHistory: false, showPickups: false}); break;
        }
    }
}

export default Customer;