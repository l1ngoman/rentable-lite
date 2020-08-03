import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Rentals from '../containers/Rentals';
import { getRentalData } from '../api';

class Rental extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound:   true,
            submitted:  false,
            formType:   props.formType,
            disabled:   (props.formType === 'Show') ? true : false,
            customers:  {},
            rental: {
                id:             (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                orderNumber:    '',
                rentalID:       '',
                status:         '',
                rental:         {},
                customers:      {},
                items:          {},
            }
        };
    }

    render(){
        let { formType, rental, customers, items, notFound, disabled, submitted } = this.state;
        return (
            <div className='container-fluid p-0'>
                <div className='row no-gutters justify-content-center align-items-center'>
                    <div className='col-sm-3'></div>
                    <div className='col-12 col-sm-6'>
                        <h1 className='text-center'>{(formType === 'New') ? 'New Rental' : `Rental #${rental.orderNumber}`}</h1>
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
                                    <Form.Group controlId="rentalFormFirstName">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Customer</Form.Label>}
                                        <Form.Control name="customerID" as="select" disabled={disabled} onChange={this.handleChange}>
                                            {customers.map(el => {
                                                return <option key={el.id} value={el.id}>{`${el.lastName}, ${el.firstName}`}</option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6}>
                                    <Form.Group controlId="rentalFormAddress1">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Item</Form.Label>}
                                        <Form.Control name="itemID" as="select" disabled={disabled} onChange={this.handleChange}>
                                            {items.map(el => {
                                                return <option key={el.id} value={el.id}>{`${el.name} - ${el.serialNumber}`}</option>
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
                :   <Rentals />
                }
                 {submitted && <Redirect to="/Rentals" />}
            </div>
        );
    }

    componentDidMount() {
        let { formType, rental } = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            const resp = getRentalData(rental.id);

            const APIRental    = resp['rental'];
            const APICustomers = resp['customers'];
            const APIItems     = resp['items'];

            (APIRental && APICustomers)
            ? this.setState({rental: APIRental, customers: APICustomers, items: APIItems, notFound: false})
            : this.setState({notFound: true})
        }
    }

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { rental } = this.state;
        rental[e.target.name] = e.target.value;
        this.setState({rental});
    }

    // ATG:: FUNCTION TO CREATE A NEW OBJECT
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.rental);
        this.setState({submitted: true})
    }

    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (formType) => {
        console.log(this.state.rental);

        if(formType === 'Show'){
            this.setState({formType: 'Edit', disabled: false});
        } else if(formType === 'Edit') {
            // save function here
            this.setState({formType: 'Show', disabled: true});
        }
    }
}

export default Rental;