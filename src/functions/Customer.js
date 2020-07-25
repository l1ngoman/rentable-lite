import React from 'react';

const Customer = props => {
    return (
        <div>
            <h1>Customer {props.match.params.id} Show Page</h1>
        </div>
    );
};

export default Customer;