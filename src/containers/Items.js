import React, { Component } from 'react';
import { getItems } from '../api';
import ItemTile from '../functions/ItemTile';

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
                <div className='container-fluid p-0'>
                    <div className='row no-gutters justify-content-center'>
                        <div className='col-1 bg-light border'></div>
                        <div className='col-3 bg-light border-top border-bottom text-center font-weight-bold'>Name</div>
                        <div className='col-3 bg-light border text-center font-weight-bold'>Serial Number</div>
                    </div>
                    {   (items.length > 0 )
                        ?   items.map((el,i) => {
                            return (
                                <ItemTile key={i} item={el}/>
                            );        
                        })
                        : "No Items found."
                    }
                </div>
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