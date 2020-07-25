import React from 'react';

const Pickup = (props) => {
    return (
        <div>
            <h1>Pickup {props.match.params.id} Show Page</h1>
        </div>
    );
}

export default Pickup;