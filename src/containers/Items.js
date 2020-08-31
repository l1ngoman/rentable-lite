import React, { Component } from 'react';
import { getItems } from '../api';
import ItemTile from '../functions/items/ItemTile';
import { Container } from 'react-bootstrap';
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
                <h1 className='text-center'>Items</h1>
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