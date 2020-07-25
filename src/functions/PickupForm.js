import React from 'react';
import Pickups from '../containers/Pickups';

const PickupForm = (props) => {
    let { pageType } = props.match.params;

    switch(pageType.toLowerCase())
    {
        case 'new':
            return (
                <div>
                    <h1>New Pickup Form</h1>
                </div>
            );
        case 'edit':
            return (
                <div>
                    <h1>Edit Pickup Form</h1>
                </div>
            );
        default:
            return (
                <Pickups />
            );
    }
};

export default PickupForm;