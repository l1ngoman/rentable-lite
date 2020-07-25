import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import appState   from './Seeds';

import Customer   from './functions/Customer';
import Customers  from './containers/Customers';
import Home       from './containers/Home';
import Item       from './functions/Item';
import Items      from './containers/Items';
import Pickup     from './functions/Pickup';
import PickupForm from './functions/PickupForm';
import Pickups    from './containers/Pickups';
import Rental     from './functions/Rental';
import RentalForm from './functions/RentalForm';
import Rentals    from './containers/Rentals';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* ATG:: INDEX PAGES */}
          <Route exact path='/Customers' component={Customers}></Route>
          <Route exact path='/Items' component={Items}></Route>
          <Route exact path='/Pickups' component={Pickups}></Route>
          <Route exact path='/Rentals' component={Rentals}></Route>

          {/* ATG:: SHOW PAGES */}
          <Route exact path='/Customer/:id' render={(routeProps) => <Customer {...routeProps}/>}></Route>
          <Route exact path='/Item/:id' render={(routeProps) => <Item {...routeProps}/>}></Route>
          <Route exact path='/Pickup/:id' render={(routeProps) => <Pickup {...routeProps}/>}></Route>
          <Route exact path='/Rental/:id' render={(routeProps) => <Rental {...routeProps}/>}></Route>

          {/* ATG:: FORM PAGES */}
          <Route exact path='/PickupForm/:pageType' render={(routeProps) => <PickupForm {...routeProps}/>}></Route>
          <Route exact path='/RentalForm/:pageType' render={(routeProps) => <RentalForm {...routeProps}/>}></Route>

          {/* ATG:: HOME PAGE */}
          <Route path='/' component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
