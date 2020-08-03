import React, { Component } from 'react';
import { getItems } from '../api';
import ItemTile from '../functions/ItemTile';
import { Container, Row, Col } from 'react-bootstrap';


class Items extends Component
{
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    render(){
        const { items } = this.state;
        return (
            <div>
                <h1 className='text-center'>Items</h1>
                <Container>
                <Row className='justify-content-center bg-secondary border border-dark d-none d-md-flex'>
                        <Col xs={4} className='text-center font-weight-bold p-1'>Name</Col>
                        <Col xs={4} className='text-center font-weight-bold p-1'>Serial Number</Col>
                        <Col xs={3} className='text-center font-weight-bold p-1'>Location</Col>
                    </Row>
                    {   (items.length > 0 )
                        ?   items.map((el,i) => {
                            return (
                                <ItemTile key={i} id={i} item={el}/>
                            );        
                        })
                        : "No Items found."
                    }
                </Container>
            </div>
        );
    }

    componentDidMount() {
        let { items } = this.state
        items = getItems();
        this.setState({items})
    }
}

export default Items;