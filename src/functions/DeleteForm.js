import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const DeleteForm = (props) => {
    const { type, handleClick } = props;
    const [ confirmation, setConfirmation ] = useState('');

    function handleChange(e) {
        setConfirmation(e.target.value);
    }

    return (
        <Container>
            <h4 className='text-center'>Delete {type}</h4>
            <hr className='w-75' />
            <Row className='justify-content-center mb-2'>
                <Col xs={12} className='text-center'>
                    <label>Are you sure? (Type 'YES')</label>
                </Col>
                <Col xs={12} className='text-center'>
                    <input className='text-center' type='text' name='Confirm_Delete' onInput={handleChange} required />
                </Col>
            </Row>
            <Row className='justify-content-center mb-2'>
                <Col xs={12} className='text-center'>
                    <Button type='button' size='lg' variant='danger' disabled={confirmation.toLowerCase() === 'yes' ? false : true} onClick={(e) => handleClick(e, 'Delete')}>
                        Confirm Delete
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default DeleteForm;