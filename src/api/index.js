/*****************************************************************
* helpers/index.js
******************************************************************
* CONTRIBUTORS:
* Andrew T. Garrett
*
* CONTENTS:
* Functions that call interact with the API.
*****************************************************************/
import appState from './Seeds';
import AuthService from '../helpers/auth_helper';
const auth = new AuthService();
const BASE = process.env.REACT_APP_RENTABLE_API_URL;


export const getCustomers = function(){
    return auth.authFetch(`${BASE}/customers`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const getCustomer = function(id){
    return auth.authFetch(`${BASE}/customers/${id}`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const getCustomerRentals = function(id){
    return auth.authFetch(`${BASE}/customers/${id}/rentals`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const getCustomerPickups = function(id){
    return auth.authFetch(`${BASE}/customers/${id}/pickups`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const updateCustomer = function(customer){
    return auth.authFetch(`${BASE}/customers/${customer.customer_id}`, {
        body: JSON.stringify(customer),
        method: "PUT"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const createCustomer = function(customer){
    return auth.authFetch(`${BASE}/customers`, {
        body: JSON.stringify(customer),
        method: "POST"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const deleteCustomer = function(id){
    return auth.authFetch(`${BASE}/customers/${id}`, {
        method: "DELETE"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const getItem = function(id){
    return auth.authFetch(`${BASE}/items/${id}`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const getItems = function(){
    return auth.authFetch(`${BASE}/items`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const getItemRentals = function(id){
    return auth.authFetch(`${BASE}/items/${id}/rentals`, {
        method: "GET"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
}

export const updateItem = function(item){
    return auth.authFetch(`${BASE}/items/${item.item_id}`, {
        body: JSON.stringify(item),
        method: "PUT"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const createItem = function(item){
    return auth.authFetch(`${BASE}/items`, {
        body: JSON.stringify(item),
        method: "POST"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};

export const deleteItem = function(id){
    return auth.authFetch(`${BASE}/items/${id}`, {
        method: "DELETE"
    })
    .then((resp) => {
        return resp.json();
    })
    .catch(err => {
        throw new Error(err)
    });
};


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
