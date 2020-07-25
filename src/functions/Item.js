import React from 'react';

const Item = (props) => {
    return (
        <div>
            <h1>Item {props.match.params.id} Show Page</h1>
        </div>
    );
};

export default Item;