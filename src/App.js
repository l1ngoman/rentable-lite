import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import appState   from './Seeds';

import Customer   from './functions/Customer';
import Customers  from './containers/Customers';
import Header     from './functions/Header';
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
      <Header />
      <Router>
        <Switch>
          {/* ATG:: SHOW PAGES */}
          <Route exact path='/Customers/:id' render={(routeProps) => <Customer formType={'Show'} {...routeProps}/>}></Route>
          <Route exact path='/Item/:id' render={(routeProps) => <Item appState={appState} {...routeProps}/>}></Route>
          <Route exact path='/Pickup/:id' render={(routeProps) => <Pickup appState={appState} {...routeProps}/>}></Route>
          <Route exact path='/Rental/:id' render={(routeProps) => <Rental appState={appState} {...routeProps}/>}></Route>
          
          {/* ATG:: EDIT PAGES */}
          <Route exact path='/Customers/:id/edit' render={(routeProps) => <Customer formType={'Edit'} {...routeProps}/>}></Route>

          {/* ATG:: FORM PAGES */}
          <Route exact path='/PickupForm/:pageType' render={(routeProps) => <PickupForm appState={appState} {...routeProps}/>}></Route>
          <Route exact path='/RentalForm/:pageType' render={(routeProps) => <RentalForm appState={appState} {...routeProps}/>}></Route>

          {/* ATG:: INDEX PAGES */}
          <Route exact path='/Customers' render={() => <Customers customers={appState.customers}/>}></Route>
          <Route exact path='/Items' render={() => <Items items={appState.items}/>}></Route>
          <Route exact path='/Pickups' render={() => <Pickups appState={appState}/>}></Route>
          <Route exact path='/Rentals' render={() => <Rentals appState={appState}/>}></Route>

          {/* ATG:: HOME PAGE */}
          <Route path='/' component={Home} appState={appState}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
