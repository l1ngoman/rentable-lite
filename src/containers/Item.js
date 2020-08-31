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
import { getItem, getItemRentals } from '../api';

class Item extends Component
{
    constructor(props){
        super(props);
        this.state = {
            submitted: false,
            notFound: true,
            hasRecords: false,
            formType: props.formType,
            itemRentals: [],
            activeRental: {},
            item: {
                item_id:            (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                item_name:          '',
                item_description:   '',
                tracking_number:    '',
                serial_number:      '',
                purchase_date:      '',
                purchase_cost:      '',
                item_status:        ''
            }
        };
    }

    render(){
        let { formType, item, activeRental, itemRentals, notFound, submitted, hasRecords } = this.state;
            return (
            <Container className='container-fluid p-0'>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col sm={3}></Col>
                    <Col xs={12} sm={6}>
                        <h1 className='text-center'>{(formType === 'New') ? 'Add Item' : item.item_name}</h1>
                    </Col>
                    <Col className='col-12 col-sm-1 text-right'>
                        {(formType !== 'New') &&
                            <Button type='button' size='lg' variant='light' onClick={() => this.handleSave(formType)}>
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
                {(!notFound) &&
                    <Container>
                        {(formType === 'Show')
                        ?   <ItemShow item={item} />
                        :   <ItemNewEdit item={item} handleChange={this.handleChange} handleClick={this.handleClick} />}
                        <hr className='w-50'/>
                        <Tabs variant='tabs' defaultActiveKey='ITEM' className='row justify-content-center mb-3' onSelect={(eventKey) => this.toggleOrderView(eventKey)}>
                            <Tab eventKey='ITEM' title='Active Rental' className='container-fluid p-0'>
                                {(Object.keys(activeRental).length > 0)
                                ?   <div>
                                        <ActiveCustomerTile info={activeRental}/>
                                    </div>
                                :   <PlaceHolderMsg alert='primary' message='Item In Stock' />}
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
                {submitted && <Redirect to="/Items" />}
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
                    notFound: false
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
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.item);
        this.setState({submitted: true})
    }

    // ATG:: FUNCTION TO TOGGLE THE EDIT/SHOW PAGE AND SAVE THE EDIT PAGE
    handleSave = (formType) => {
        console.log(this.state.item);

        if(formType === 'Show'){
            this.setState({formType: 'Edit', readonly: false});
        } else if(formType === 'Edit') {
            // save function here
            this.setState({formType: 'Show', readonly: true});
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
}

export default Item;