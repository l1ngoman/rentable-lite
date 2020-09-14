import moment from 'moment'                      // https://momentjs.com/
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Tabs, Tab, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import ItemShow from '../functions/items/ItemShow';
import ItemNewEdit from '../functions/items/ItemNewEdit';
import DeleteForm from '../functions/DeleteForm';
import PlaceHolderMsg from '../functions/PlaceHolderMsg';
import OrderIndexHeader from '../functions/OrderIndexHeader';
import RentalTile from '../functions/RentalTile';
import ActiveCustomerTile from '../functions/customers/ActiveCustomerTile';
import { getItem, getItemRentals, createItem, updateItem, deleteItem } from '../api';

class Item extends Component
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
            redirect:               "/Items",
            hasRecords: false,
            itemRentals: [],
            activeRental: {},
            tmpName:                '',
            item: {
                item_id:            (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                item_name:          '',
                item_description:   '',
                tracking_number:    '',
                serial_number:      '',
                purchase_date:      moment().format('YYYY-MM-DD'),
                purchase_cost:      0.00,
                item_status:        ''
            }
        };
    }

    render(){
        let { item, tmpName, activeRental, itemRentals, notFound, submitted, formType, showMessage, message, messageClass, redirect, hasRecords } = this.state;
        showMessage && this.hideMessage();
            return (
            <Container className='container-fluid p-0'>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col sm={3}></Col>
                    <Col xs={12} sm={6}>
                        <h1 className='text-center'>{(formType === 'New') ? 'Add Item' : tmpName}</h1>
                    </Col>
                    <Col className='col-12 col-sm-1 text-right'>
                        {(formType !== 'New') &&
                            <Button type='button' size='lg' variant='light' className='m-1' onClick={() => this.handleSave(formType)}>
                                {(formType !== 'Edit')
                                ?   <FontAwesomeIcon icon={faEdit} />
                                :   <FontAwesomeIcon icon={faSave} />}
                            </Button>}
                    </Col>
                    <Col className='col-sm-2'></Col>
                </Row>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col xs={6}>
                        <a href='/Items' className='text-muted text-small'>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} />
                            <span className='ml-1'>Back to All Items</span>
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
                    <Container>
                        {(formType === 'Show')
                        ?   <ItemShow item={item} />
                        :   <ItemNewEdit item={item} handleChange={this.handleChange} handleClick={this.handleClick} />}
                        <hr className='w-50'/>
                        <Tabs variant='tabs' defaultActiveKey='ITEM' className='row justify-content-center mb-3' onSelect={(eventKey) => this.toggleOrderView(eventKey)}>
                            <Tab eventKey='ITEM' title='Active Rental' className='container-fluid p-0'>
                                {(activeRental.active_rental_id && activeRental.active_rental_id != null)
                                ?   <div>
                                        <ActiveCustomerTile info={activeRental}/>
                                    </div>
                                :   <PlaceHolderMsg alert='success' message='Item In Stock' />}
                            </Tab>
                            <Tab eventKey='RENTAL' title='Rental History' className='container-fluid p-0'>
                                {(itemRentals.length > 0)
                                ?   <div>
                                        <OrderIndexHeader orderType='Rental'/>
                                        {itemRentals.map((el,i) => {
                                            return <RentalTile key={i} rental={el} />
                                        })}
                                    </div>
                                :   <PlaceHolderMsg alert='dark' message='No Rental Order History' />}
                            </Tab>
                            <Tab eventKey='MORE' title='More' className='container-fluid p-0'>
                                {(!hasRecords)
                                ?   <DeleteForm type='Item' handleClick={this.handleClick} />
                                :   <PlaceHolderMsg alert='dark' message='No Additional Data To Display' />}
                            </Tab>
                        </Tabs>
                    </Container>}
                {submitted && <Redirect to={redirect} />}
            </Container>
        );
    }

    componentDidMount() {
        let { formType, item }  = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            getItem(item.item_id)
            .then(data => {
                this.setState({
                    item: {
                        item_id:            data.responseObject.item_id,
                        item_name:          data.responseObject.item_name,
                        item_description:   data.responseObject.item_description,
                        tracking_number:    data.responseObject.tracking_number,
                        serial_number:      data.responseObject.serial_number,
                        purchase_date:      data.responseObject.purchase_date,
                        purchase_cost:      data.responseObject.purchase_cost,
                        item_status:        data.responseObject.item_status,
                    },
                    activeRental:   data.responseObject.active_rental,
                    hasRecords:     data.responseObject.hasRecords,
                    notFound: false,
                    // ATG:: CREATE A TEMPORARY NAME FOR THE PAGE TITLE SO IT DOESN'T CHANGE AS THE USER IS EDITING THE NAME ON THE FORM UNTIL SAVED
                    tmpName: data.responseObject.item_name
                });
            });
        }
    }

    // ATG:: HANDLE CHANGE FUNCTION FOR FORM DATA
    handleChange = (e) => {
        let { item } = this.state;
        item[e.target.name] = e.target.value;
        this.setState({item});
    }

    // ATG:: FUNCTION TO CREATE A NEW OBJECT
    handleClick = (e, type = null) => {
        e.preventDefault();
        let { item, formType } = this.state;

        switch(formType) {
            case 'Edit':
                updateItem(item)
                .then(data => {  
                    if(data.error) {
                        this.setState({
                            formType:       'Edit', 
                            showMessage:    true,
                            messageClass:   'alert-danger',
                            message:        data.message
                        });
                    } else {
                        this.setState({
                            formType:       'Show', 
                            showMessage:    true,
                            messageClass:   'alert-success',
                            message:        data.message,
                            tmpName:        this.state.item.item_name
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        formType:       'Edit', 
                        showMessage:    true,
                        messageClass:   'alert-danger',
                        message:        err.message
                    });
                });
                break;
            case 'New':
                createItem(item)
                .then(data => {
                    if(data.error) {
                        this.setState({
                            showMessage:    true,
                            messageClass:   'alert-danger',
                            message:        data.message
                        });
                    } else {
                        this.setState({
                            redirect: `/Items/${data.responseObject.item_id}`,
                            submitted: true
                        });
                   }
                })
                .catch(err => {
                    this.setState({
                        showMessage:    true,
                        messageClass:   'alert-danger',
                        message:        err.message
                    });
                });
                break;
            default:
        }
        if(type === 'Delete') {
            deleteItem(item.item_id)
            .then(data => {
                this.setState({
                    redirect: `/Items`,
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
            this.setState({formType: 'Edit'});
        } else if(formType === 'Edit') {
            this.setState({formType: 'Show'});
        }
    }

    toggleOrderView = (orderType) => {
        const { item_id } = this.state.item;
        if(orderType === 'RENTAL') {
            if(this.state.itemRentals.length === 0) {
                getItemRentals(item_id)
                .then(data => {
                    this.setState({itemRentals: data.responseObject});
                });
            }
        }
    }

    hideMessage = () => {
        window.setTimeout(() => {
            this.setState({
                showMessage:  false,
                messageClass: '',
                message:      ''
            });
        }, 4000);
    }
}

export default Item;