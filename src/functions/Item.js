import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import Items from '../containers/Items';
import { getItem } from '../api';

class Item extends Component
{
    constructor(props){
        super(props);
        this.state = {
            notFound: true,
            readonly: (props.formType === 'Show') ? true : false,
            formType: props.formType,
            item: {
                id:             (props.formType === 'New') ? '' : ((props.id) ? props.id : props.match.params.id),
                name:           '',
                serialNumber:   '',
            }
        };
    }

    render(){
        let { formType, item, notFound, readonly, submitted } = this.state;
        return (
            <div className='container-fluid p-0'>
                <div className='row no-gutters justify-content-center align-items-center'>
                    <div className='col-sm-3'></div>
                    <div className='col-12 col-sm-6'>
                        <h1 className='text-center'>{(formType === 'New') ? 'Add Item' : item.name}</h1>
                    </div>
                    <div className='col-12 col-sm-1 text-center'>
                        {(formType !== 'New')
                            ?   <Button type='button' size='lg' variant='light' onClick={() => this.handleSave(formType)}>
                                    {(formType !== 'Edit')
                                    ?   <FontAwesomeIcon icon={faEdit} />
                                    :   <FontAwesomeIcon icon={faSave} />}
                                </Button>
                            :   <div></div>
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
                                    <Form.Group controlId="itemFormName">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Item Name</Form.Label>}
                                        <Form.Control name="name" type="input" value={item.name} placeholder="Name" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={10} sm={6} md={5} lg={4}>
                                    <Form.Group controlId="itemFormSerialNumber">
                                    {(formType !== 'Show') && 
                                        <Form.Label>Serial #</Form.Label>}
                                        <Form.Control name="serialNumber" type="input" value={item.serialNumber} placeholder="Serial #" readOnly={readonly} onChange={this.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* ATG:: ONLY RENDER BUTTON FOR THE NEW PAGE */}
                            {(formType === 'New') &&
                            <Row className="justify-content-center pb-2">
                                <Col xs={3} className='text-center'>
                                    <Button variant="primary" type="submit" onClick={this.handleClick}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>}
                        </Form>
                    </Container>
                :   <Items />
                }
                {submitted && <Redirect to="/Items" />}
            </div>
        );
    }

    componentDidMount() {
        let { formType, item } = this.state;

        if(formType === 'New') {
            this.setState({notFound: false});
        } else {
            const APIItem = getItem(item.id);
            (APIItem)
            ? this.setState({item: APIItem, notFound: false})
            : this.setState({notFound: true})
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
}

export default Item;