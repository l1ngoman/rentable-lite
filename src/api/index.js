// ATG:: THIS FILE CONTAINS FUNCTIONS THAT CALL DATA VIA THE API
// NOTE:: THE FIRST ITERATION OF THIS APP WILL CALL THE DATA FROM THE APP STATE SEED FILE

import appState from '../Seeds';

// FIRST ITERATION
export const getCustomer = function(id){
    // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
    return (appState.customers[id-1])
    ? appState.customers[id-1]
    : false;
}

export const getCustomers = function(){
    return appState.customers;
}
