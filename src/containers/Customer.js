import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import CustomerShow from '../functions/customers/CustomerShow';
import CustomerNewEdit from '../functions/customers/CustomerNewEdit';
import DeleteForm from '../functions/DeleteForm';
import PlaceHolderMsg from '../functions/PlaceHolderMsg';
import RentalTile from '../functions/RentalTile';
import PickupTile from '../functions/PickupTile';
import OrderIndexHeader from '../functions/OrderIndexHeader';
import ActiveItemIndexHeader from '../functions/items/ActiveItemIndexHeader';
import ActiveItemTile from '../functions/items/ActiveItemTile';
import { getCustomer, getCustomerRentals, getCustomerPickups, updateCustomer, createCustomer, deleteCustomer } from '../api';
import '../styles/App.css';

class Customer extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound:               true,
            submitted:              false,
            formType:               props.formType,
            showMessage:            false,
            message:                '',
            messageClass:           '',
            redirect:               "/Customers",
            hasRecords:             false,
            customerActiveItems:    [],
            customerRentals:        [],
            customerPickups:        [],
            customer: {
                customer_id:    (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                first_name:     '',
                last_name:      '',
                address_1:      '',
                address_2:      '',
                city:           '',
                state:          '',
                zip:            '',
                phone:          '',
                email:          '',      
            }
        };
    }

    render(){
        let { formType, customer, customerActiveItems, customerRentals, customerPickups, hasRecords, notFound, submitted, showMessage, message, messageClass, redirect } = this.state;
        showMessage && this.hideMessage();
        return (
            <Container className='container-fluid p-0'>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col sm={3}></Col>
                    <Col xs={12} sm={6}>
                        <h1 className='text-center'>{(formType === 'New') ? 'Add Customer' : `${customer.first_name} ${customer.last_name}`}</h1>
                    </Col>
                    <Col xs={12} sm={1} className='text-right'>
                        {(formType !== 'New') &&
                            <Button type='button' size='lg' variant='light' onClick={() => this.handleSave(formType)}>
                                {(formType !== 'Edit')
                                ?   <FontAwesomeIcon icon={faEdit} />
                                :   <FontAwesomeIcon icon={faSave} />}
                            </Button>}
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col xs={6}>
                        <a href='/Customers' className='text-muted text-small'>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} />
                            <span className='ml-1'>Back to All Customers</span>
                        </a>
                    </Col>
                </Row>
                <hr className='w-50'/>
                {showMessage &&
                    <Container>
                        <Row className='justify-content-center'>
                            <Col xs={12} sm={8} md={6} className={`text-center font-weight-bold ${messageClass}`}>{message}</Col>
                        </Row>
                    </Container>}
                {(!notFound) &&
                    <Container className='mb-5'>
                        {(formType === 'Show')
                        ?   <CustomerShow customer={customer} />
                        :   <CustomerNewEdit customer={customer} handleChange={this.handleChange} handleClick={this.handleClick} />}
                        <hr className='w-50'/>
                        {(formType === 'Show') &&
                        <Container style={{maxWidth:"750px"}}>
                            <Tabs variant='tabs' defaultActiveKey='ITEM' className='row justify-content-center mb-3' onSelect={(eventKey) => this.toggleOrderView(eventKey)}>
                                <Tab eventKey='ITEM' title='Active Items' className='container-fluid p-0'>
                                    {(customerActiveItems.length > 0)
                                    ?   <div>
                                            <ActiveItemIndexHeader />
                                            {customerActiveItems.map((el,i) => {
                                                return <ActiveItemTile key={i} item={el} />
                                            })}
                                        </div>
                                    :   <PlaceHolderMsg alert='dark' message='No Active Rental Items' />}
                                </Tab>
                                <Tab eventKey='RENTAL' title='Rental History' className='container-fluid p-0'>
                                    {(customerRentals.length > 0)
                                    ?   <div>
                                            <OrderIndexHeader orderType='Rental'/>
                                            {customerRentals.map((el,i) => {
                                                el.customer_id = customer.customer_id;
                                                el.first_name = customer.first_name;
                                                el.last_name = customer.last_name;
                                                return <RentalTile key={i} rental={el} />
                                            })}
                                        </div>
                                    :   <PlaceHolderMsg alert='dark' message='No Rental Order History' />}
                                </Tab>
                                <Tab eventKey='PICKUP' title='Pickup History' className='container-fluid p-0'>
                                    {(customerPickups.length > 0)
                                    ?   <div>
                                            <OrderIndexHeader orderType='Pickup'/>
                                            {customerPickups.map((el,i) => {
                                                el.customer_id = customer.customer_id;
                                                el.first_name = customer.first_name;
                                                el.last_name = customer.last_name;
                                                return <PickupTile key={i} pickup={el} />
                                            })}
                                        </div>
                                    :   <PlaceHolderMsg alert='dark' message='No Pickup History' />}
                                </Tab>
                                <Tab eventKey='MORE' title='More' className='container-fluid p-0'>
                                    {(!hasRecords)
                                    ?   <DeleteForm type='Customer' handleClick={this.handleClick} />
                                    :   <PlaceHolderMsg alert='dark' message='No Additional Data to Display' />}
                                </Tab>
                            </Tabs>
                        </Container>}
                    </Container>}
                {submitted && <Redirect to={redirect} />}
            </Container>
        );
    }

    componentDidMount() {
        let { formType, customer }  = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            getCustomer(customer.customer_id)
            .then(data => {
                this.setState({
                    customer: {
                        customer_id:    data.responseObject.customer_id,
                        first_name:     data.responseObject.first_name,
                        last_name:      data.responseObject.last_name,
                        address_1:      data.responseObject.address_1,
                        address_2:      data.responseObject.address_2,
                        city:           data.responseObject.city,
                        state:          data.responseObject.state,
                        zip:            data.responseObject.zip,
                        phone:          data.responseObject.phone,
                        email:          data.responseObject.email, 
                    },
                    customerActiveItems: data.responseObject.active_items,
                    hasRecords: data.responseObject.hasRecords,
                    notFound: false
                });
            });
        }
    }

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { customer } = this.state;
        customer[e.target.name] = e.target.value;
        this.setState({customer});
    }

    // ATG:: FUNCTION TO CREATE A NEW OBJECT
    handleClick = (e, type = null) => {
        e.preventDefault();
        let { customer, formType } = this.state;

        switch(formType) {
            case 'Edit':
                updateCustomer(customer)
                .then(data => {
                    this.setState({
                        formType:       'Show', 
                        showMessage:    true,
                        messageClass:   'alert-success',
                        message:        data.message
                    });
                })
                .catch(err => {
                    this.setState({
                        formType:       'Show', 
                        showMessage:    true,
                        messageClass:   'alert-error',
                        message:        err.message
                    });
                });
                break;
            case 'New':
                createCustomer(customer)
                .then(data => {
                    this.setState({
                        redirect: `/Customers/${data.responseObject.customer_id}`,
                        submitted: true
                    });
                })
                .catch(err => {
                    this.setState({
                        showMessage:    true,
                        messageClass:   'alert-error',
                        message:        err.message
                    });
                });
                break;
            default:
        }
        if(type === 'Delete') {
            deleteCustomer(customer.customer_id)
            .then(data => {
                this.setState({
                    redirect: `/Customers`,
                    submitted: true
                });
            })
            .catch(err => {
                this.setState({
                    showMessage:    true,
                    messageClass:   'bg-error',
                    message:        err.message
                });
            });
        }
    }

    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (formType) => {
        if(formType === 'Show'){
            this.setState({formType: 'Edit', readonly: false});
        } else if(formType === 'Edit') {
            // save function here
            this.setState({formType: 'Show', readonly: true});
        }
    }

    toggleOrderView = (orderType) => {
        const { customer_id } = this.state.customer;
        switch(orderType){
            case 'RENTAL':
                if(this.state.customerRentals.length === 0) {
                    getCustomerRentals(customer_id)
                    .then(data => {
                        this.setState({customerRentals: data.responseObject});
                    });
                }
                break;
            case 'PICKUP':
                if(this.state.customerPickups.length === 0) {
                    getCustomerPickups(customer_id)
                    .then(data => {
                        this.setState({customerPickups: data.responseObject});
                    });
                }
                break;
            default:
        }
    }

    hideMessage = () => {
        window.setTimeout(() => {
            this.setState({
                showMessage:  false,
                messageClass: '',
                message:      ''
            });
        }, 2250);
    }
}

export default Customer;