import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import appState   from './api/Seeds';

import Customer    from './containers/Customer';
import Customers   from './containers/Customers';
import Header      from './functions/Header';
import Home        from './containers/Home';
import Item        from './containers/Item';
import Items       from './containers/Items';
import Pickup      from './functions/Pickup';
import Pickups     from './containers/Pickups';
import Rental      from './functions/Rental';
import Rentals     from './containers/Rentals';
import Login       from './containers/Login';
import AuthService from './helpers/auth_helper';

const App = function() {
  const auth = new AuthService();
  return (
    <div>
      <Header />
      <Router>
        {
          auth.loggedIn()
          ? <Switch>
              {/* ATG:: NEW PAGES */}
              <Route exact path='/Customers/new' render={(routeProps) => <Customer formType={'New'} {...routeProps}/>}></Route>
              <Route exact path='/Items/new' render={(routeProps) => <Item formType={'New'} {...routeProps}/>}></Route>
              <Route exact path='/Rentals/new' render={(routeProps) => <Rental formType={'New'} {...routeProps}/>}></Route>
              <Route exact path='/Pickups/new' render={(routeProps) => <Pickup formType={'New'} {...routeProps}/>}></Route>

              {/* ATG:: SHOW PAGES */}
              <Route exact path='/Customers/:id' render={(routeProps) => <Customer formType={'Show'} {...routeProps}/>}></Route>
              <Route exact path='/Items/:id' render={(routeProps) => <Item formType={'Show'} {...routeProps}/>}></Route>
              <Route exact path='/Rentals/:id' render={(routeProps) => <Rental formType={'Show'} {...routeProps}/>}></Route>
              <Route exact path='/Pickups/:id' render={(routeProps) => <Pickup formType={'Show'} {...routeProps}/>}></Route>
              
              {/* ATG:: INDEX PAGES */}
              <Route exact path='/Customers' component={Customers}></Route>
              <Route exact path='/Items' component={Items}></Route>
              <Route exact path='/Pickups' component={Pickups}></Route>
              <Route exact path='/Rentals' component={Rentals}></Route>

              <Route exact path='/login' component={Login}></Route>

              {/* ATG:: HOME PAGE */}
              <Route path='/' component={Home} appState={appState}></Route>
            </Switch>
          : <Switch>
              <Route path='/' component={Login}></Route>
            </Switch>
        }
      </Router>
    </div>
  );
}

export default App;
