import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const ItemTile = props => {
    const { item } = props;
    return (
        <div className='row no-gutters justify-content-center align-items-center'>
            <div className='col-1 text-center border-bottom border-left'>
                <Button type='button' size='sm' variant='light' href={`/Items/${item.id}`}>
                    <FontAwesomeIcon icon={faFileAlt} />
                </Button>
            </div>
            <div className='col-3 border-bottom border-left p-1'>{item.name}</div>
            <div className='col-3 border-bottom border-left border-right p-1'>{item.serialNumber}</div>
        </div>
    );
};

export default ItemTile;