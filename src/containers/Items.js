import React, { Component } from 'react';
import { getItems } from '../api';
import ItemTile from '../functions/items/ItemTile';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ItemIndexHeader from '../functions/items/ItemIndexHeader';


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
                <h1 className='text-center'>All Items</h1>
                <Row className='no-gutters justify-content-center align-items-center'>
                    <Col xs={6}>
                        <a href='/Items/new' className='text-muted text-small'><FontAwesomeIcon icon={faPlusSquare} /><span className='ml-1'>Create a New Item</span></a>
                    </Col>
                </Row>
                <hr className='w-50'/>
                <Container>
                    <ItemIndexHeader />
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
        getItems()
        .then(data => {
            items = data.responseObject;
            this.setState({items})
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export default Items;