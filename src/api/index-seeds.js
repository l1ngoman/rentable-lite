// ATG:: THIS FILE CONTAINS FUNCTIONS THAT CALL DATA VIA THE API
// NOTE:: THE FIRST ITERATION OF THIS APP WILL CALL THE DATA FROM THE APP STATE SEED FILE

import appState from './Seeds';

// FIRST ITERATION
export const getCustomer = function(id){
    // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
    if(appState.customers[id-1]) {
        const customer = appState.customers[id-1];
        const rentals  = appState.rentals;
        const pickups  = appState.pickups;
        
        let customerRentals = [];
        let customerPickups = [];

        customerRentals = rentals.filter(el => {
            for( let i in pickups) {
                if(pickups[i].rentalID === el.id ) {
                    el['pickup'] = pickups[i];
                }
            }
            return el.customerID === customer.id;
        })

        customerPickups = pickups.filter(el => {
            el['customer']  = customer;
            el['rental']    = rentals[el.rentalID-1];
            return rentals[el.rentalID-1].customerID === customer.id;
        })

        return {
            customer,
            customerRentals,
            customerPickups
        }
    } else {
        return false;
    }
}

export const getCustomers = function(){
    return appState.customers;
}

export const getItem = function(id){
    // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
    return (appState.items[id-1])
    ? appState.items[id-1]
    : false;
}

export const getItems = function(){
    const { items, rentals, customers } = appState;

    for( let el in items) {
        for( let i in rentals) {
            if(rentals[i].itemID === items[el].id) {
                rentals[i]['customer']  = customers[rentals[i].customerID-1]
                items[el]['rental']     = rentals[i];
            }
        }
    }

    return items;
}

export const getRentalData = function(id){
    // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
    if(appState.rentals[id-1]) {
        let rental              = appState.rentals[id-1];
        let { customers, items} = appState;
        
        rental['customer']  = customers[rental.customerID-1];

        return {
            rental,
            customers,
            items
        };
    } else {
        return false;
    }
}

export const getRentals = function(){
    let rentals = appState.rentals;
    let pickups = appState.pickups;

    for( let el in rentals) {
        rentals[el]['customer'] = appState.customers[rentals[el].customerID-1];
        
        for( let i in pickups) {
            if(pickups[i].rentalID === rentals[el].id) {
                rentals[el]['pickup'] = pickups[i];
            }
        }
    }

    return rentals;
}

export const getPickupData = function(id){
    // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
    if(appState.pickups[id-1]) {
        let pickup          = appState.pickups[id-1];
        let rental          = appState.rentals[pickup.rentalID-1];
        let customers       = appState.customers;
        let items           = appState.items;
        pickup['customer']  = customers[rental.customerID-1];

        return {
            pickup,
            customers,
            items
        };
    } else {
        return false;
    }
}

export const getPickups = function(){
    let pickups = appState.pickups;
    for( let el in pickups) {
        let rental              = appState.rentals[pickups[el].rentalID-1];
        pickups[el]['customer'] = appState.customers[rental.customerID-1];
        pickups[el]['rental']   = rental;
    }

    return pickups;
}
