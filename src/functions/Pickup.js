import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { getPickupData } from '../api';

class Pickup extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound:   true,
            submitted:  false,
            formType:   props.formType,
            disabled:   (props.formType === 'Show') ? true : false,
            customers:  {},
            pickup: {
                pickupid:               (props.formType === 'New') ? '' : ((props.pickup_id) ? props.pickup_id : props.match.params.id),
                pickup_number:          '',
                pickup_date:            '',
                pickup_actual_date:     '',
                rental_id:              '',
                rental_order_number:    '',
                pickup_status:          '',
            }
        };
    }

    render(){
        let { formType, pickup, customers, items, notFound, disabled, submitted } = this.state;
        return (
            <div className='container-fluid p-0'>
                <div className='row no-gutters justify-content-center align-items-center'>
                    <div className='col-sm-3'></div>
                    <div className='col-12 col-sm-6'>
                        <h1 className='text-center'>{(formType === 'New') ? 'New Pickup' : `Pickup #${pickup.pickup_number}`}</h1>
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
                                <Col xs={10} sm={6}>
                                    <Form.Group controlId="pickupFormFirstName">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Customer</Form.Label>}
                                        <Form.Control name="customerID" as="select" disabled={disabled} onChange={this.handleChange}>
                                            {customers.map(el => {
                                                return <option key={el.customer_id} value={el.customer_id}>{`${el.last_name}, ${el.first_name}`}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6}>
                                    <Form.Group controlId="pickupFormAddress1">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Item</Form.Label>}
                                        <Form.Control name="itemID" as="select" disabled={disabled} onChange={this.handleChange}>
                                            {items.map(el => {
                                                return <option key={el.item_id} value={el.item_id}>{`${el.item_name} - ${el.serial_number}`}</option>
                                            })}
                                        </Form.Control>
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
                :   <Redirect to='/Pickups'/>
                }
                 {submitted && <Redirect to="/Pickups" />}
            </div>
        );
    }

    componentDidMount() {
        let { formType, pickup } = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            const resp = getPickupData(pickup.id);

            const APIPickup    = resp['pickup'];
            const APICustomers = resp['customers'];
            const APIItems     = resp['items'];

            (APIPickup && APICustomers)
            ? this.setState({pickup: APIPickup, customers: APICustomers, items: APIItems, notFound: false})
            : this.setState({notFound: true})
        }
    }

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { pickup } = this.state;
        pickup[e.target.name] = e.target.value;
        this.setState({pickup});
    }

    // ATG:: FUNCTION TO CREATE A NEW OBJECT
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.pickup);
        this.setState({submitted: true})
    }

    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (formType) => {
        console.log(this.state.pickup);

        if(formType === 'Show'){
            this.setState({formType: 'Edit', disabled: false});
        } else if(formType === 'Edit') {
            // save function here
            this.setState({formType: 'Show', disabled: true});
        }
    }
}

export default Pickup;