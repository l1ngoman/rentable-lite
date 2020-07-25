import React from 'react';

const Rental = (props) => {
    return (
        <div>
            <h1>Rental {props.match.params.id} Show Page</h1>
        </div>
    );
}

export default Rental;