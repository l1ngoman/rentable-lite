import appState from './Seeds';
// ATG:: THIS FILE CONTAINS FUNCTIONS THAT CALL DATA VIA THE API
const BASE = 'http://localhost:3001';


// export const Customer = {
//     getCustomers: function(){
//         return fetch(BASE + '/customers')
//         .then((resp) => {
//           resp.errors && console.log(resp);
    
//           let json = resp.json();
//           console.log(json);
//           return json
//         });
//     },
//     getCustomer: function(id){
//         return fetch(BASE + `/customers/${id}`)
//         .then((resp) => {
//           resp.errors && console.log(resp);
    
//           let json = resp.json();
//           console.log(json);
//           return json
//         });
//     },
// }

export const loginUser = function(login){
    return fetch(`${BASE}/user/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login),
      method: "POST"
    })
    .then((resp) => {
      return resp.json();
    })
    .catch(err => {
      throw new Error(err)
    });
};

export const getCustomers = function(){
    return appState.customers;
}

export const getCustomer = function(id){
  // WILL USE ID - 1 TO GET THE CUSTOMER, SINCE THEY ARE ZERO-INDEXED
  return (appState.customers[id-1])
  ? appState.customers[id-1]
  : false;
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
