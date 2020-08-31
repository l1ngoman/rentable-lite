import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import CustomerTile from '../functions/customers/CustomerTile';
import { getCustomers } from '../api';


class Customers extends Component
{
    constructor(props){
        super(props);

        this.state = {
            customers: []
        };
    }

    render(){
        const { customers } = this.state;
        return (
            <div>
                <h1 className='text-center'>All Customers</h1>
                <Container>
                    <Row className='no-gutters justify-content-center align-items-center'>
                        <Col xs={6}>
                            <a href='/Customers/new' className='text-muted text-small'><FontAwesomeIcon icon={faPlusSquare} /><span className='ml-1'>Create a New Customer</span></a>
                        </Col>
                    </Row>
                    <hr className='w-50'/>
                    <Row className='justify-content-center bg-secondary border border-dark d-none d-md-flex'>
                        <Col xs={3} className='text-center font-weight-bold p-1'>Name</Col>
                        <Col xs={3} className='text-center font-weight-bold p-1'>Address</Col>
                        <Col xs={3} className='text-center font-weight-bold p-1'>Phone</Col> 
                        <Col xs={3} className='text-center font-weight-bold p-1'>Email</Col> 
                    </Row>
                    {   (customers.length > 0 )
                        ? customers.map((el,i) => {
                            return (
                                <CustomerTile key={i} id={i} customer={el}/>
                            );        
                        })
                        : "No Customers found."
                    }
                </Container>
            </div>
        );
    }

    componentDidMount() {
        let { customers } = this.state
        getCustomers()
        .then(data => {
            customers = data.responseObject;
            this.setState({customers})
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export default Customers;