const appState = {
    company: {
        companyName:  "Jake's Rental Co.",
        address1:     '1117 5th Ave',
        address2:     'Ste 201',
        city:         'San Diego',
        state:        'CA',
        zip:          '92101',
        phone:        '619-555-2567',
        email:        'cs@jakesrental.com'
    },
    customers: [
      {
        id:         1,
        firstName:  'Tom',
        lastName:   'Daily',
        address1:   '123 Testing Ln',
        address2:   '',
        city:       'Jacksonville',
        state:      'MO',
        zip:        '22345',
        phone:      '123-445-3345',
        email:      'tdaily@website.com'
      },
      {
        id:         2,
        firstName:  'John',
        lastName:   'Hickson',
        address1:   '99842 Hwy 345',
        address2:   '',
        city:       'Austin',
        state:      'TX',
        zip:        '99876',
        phone:      '898-223-4455',
        email:      'hickson@johnhickson.com'
      },
      {
        id:         3,
        firstName:  'Ralph',
        lastName:   'Vaughn Williams',
        address1:   '8922 W Second Ave',
        address2:   '',
        city:       'Seattle',
        state:      'WA',
        zip:        '98101',
        phone:      '206-555-2223',
        email:      'rvw@composer.com'
      },
    ],
    items: [
      {
          id:           1,
          name:         'To Kill a Mockingbird',
          serialNumber: '9780061120084',
      },
      {
          id:           2,
          name:         '1984',
          serialNumber: '9780451524935',
      },
      {
          id:           3,
          name:         'The Great Gatsby',
          serialNumber: '9780333791035',
      },
      {
          id:           4,
          name:         'The Catcher in the Rye',
          serialNumber: '9780316769488',
      },
      {
          id:           5,
          name:         'Moby Dick',
          serialNumber: '9780192741561',
      },
    ],
    rentals: [
      {
          id:           1,
          orderNumber:  100,
          customerID:   3,
          itemID:       4,
          status:       'OPEN'
      },
      {
          id:           2,
          orderNumber:  101,
          customerID:   2,
          itemID:       2,
          status:       'OPEN'
      },
      {
          id:           3,
          orderNumber:  105,
          customerID:   1,
          itemID:       2,
          status:       'CLOSED'
      },
      {
          id:           4,
          orderNumber:  106,
          customerID:   1,
          itemID:       3,
          status:       'OPEN'
      },
    ],
    pickups: [
      {
          id:           1,
          orderNumber:  100,
          rentalID:     3,
          status:       'CLOSED'
      },
      {
          id:           2,
          orderNumber:  102,
          rentalID:     2,
          status:       'OPEN'
      },
    ]
  };

export default appState;