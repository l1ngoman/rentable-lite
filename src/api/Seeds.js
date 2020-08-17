const appState = {
    "company": {
        "company_id":  "1",
        "company_name":  "Jake's Rental Co.",
        "address_1":     "1117 5th Ave",
        "address_2":     "Ste 201",
        "city":         "San Diego",
        "state":        "CA",
        "zip":          "92101",
        "phone":        "619-555-2567",
        "email":        "cs@jakesrental.com"
    },
    "users": {
        "user_id":    "1",
        "first_name": "Andrew",
        "last_name":  "Garrett",
        "email":      "athomasgarrett@gmail.com"
    },
    "customers": [
      {
        "customer_id":         "1",
        "first_name":  "Tom",
        "last_name":   "Daily",
        "address_1":   "123 Testing Ln",
        "address_2":   "",
        "city":       "Jacksonville",
        "state":      "MO",
        "zip":        "22345",
        "phone":      "123-445-3345",
        "email":      "tdaily@website.com"
      },
      {
        "customer_id":         "2",
        "first_name":  "John",
        "last_name":   "Hickson",
        "address_1":   "99842 Hwy 345",
        "address_2":   "",
        "city":       "Austin",
        "state":      "TX",
        "zip":        "99876",
        "phone":      "898-223-4455",
        "email":      "hickson@johnhickson.com"
      },
      {
        "customer_id":         "3",
        "first_name":  "Ralph",
        "last_name":   "Vaughn Williams",
        "address_1":   "8922 W Second Ave",
        "address_2":   "",
        "city":       "Seattle",
        "state":      "WA",
        "zip":        "98101",
        "phone":      "206-555-2223",
        "email":      "rvw@composer.com"
      },
    ],
    "items": [
      {
          "item_id":               "1",
          "name":             "To Kill a Mockingbird",
          "author_first_name":  "Harper",
          "author_last_name":   "Lee",
          "serial_number":     "9780061120084",
      },
      {
          "item_id":               "2",
          "name":             "1984",
          "author_first_name":  "George",
          "author_last_name":   "Orwell",
          "serial_number":     "9780582060180",
      },
      {
          "item_id":               "3",
          "name":             "The Great Gatsby",
          "author_first_name":  "F. Scott",
          "author_last_name":   "Fitzgerald",
          "serial_number":     "9780333791035",
      },
      {
          "item_id":               "4",
          "name":             "The Catcher in the Rye",
          "author_first_name":  "J. D.",
          "author_last_name":   "Salinger",
          "serial_number":     "9780316769488",
      },
      {
          "item_id":               "5",
          "name":             "Moby Dick",
          "author_first_name":  "Herman",
          "author_last_name":   "Melville",
          "serial_number":     "9780192741561",
      },
    ],
    "rentals": [
      {
          "rental_id":     "1",
          "order_number":  "100",
          "order_date":  "2020-07-28",
          "customer_id":   "3",
          "item_id":       "4",
          "status":       "OPEN"
      },
      {
          "rental_id":           "2",
          "order_number":  "101",
          "order_date":  "2020-08-05",
          "customer_id":   "2",
          "item_id":       "2",
          "status":       "OPEN"
      },
      {
          "rental_id":           "3",
          "order_number":  "105",
          "order_date":  "2020-08-10",
          "customer_id":   "1",
          "item_id":       "2",
          "status":       "CLOSED"
      },
      {
          "rental_id":           "4",
          "order_number":  "106",
          "order_date":  "2020-08-03",
          "customer_id":   "1",
          "item_id":       "3",
          "status":       "OPEN"
      },
    ],
    "pickups": [
      {
          "pickup_id":           "1",
          "order_number":  "100",
          "pickup_date": "2020-07-31",
          "rental_id":     "3",
          "status":       "CLOSED"
      },
      {
          "pickup_id":           "2",
          "order_number":  "102",
          "pickup_date": "2020-08-16",
          "rental_id":     "2",
          "status":       "OPEN"
      },
    ]
  };

export default appState;