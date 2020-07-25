import React from 'react';
import Rentals from '../containers/Rentals';

const RentalForm = (props) => {
    let { pageType } = props.match.params;

    switch(pageType.toLowerCase())
    {
        case 'new':
            return (
                <div>
                    <h1>New Rental Form</h1>
                </div>
            );
        case 'edit':
            return (
                <div>
                    <h1>Edit Rental Form</h1>
                </div>
            );
        default:
            return (
                <Rentals />
            );
    }
};

export default RentalForm;