import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

import appState   from './api/Seeds';

import Customer   from './functions/Customer';
import Customers  from './containers/Customers';
import Header     from './functions/Header';
import Home       from './containers/Home';
import Item       from './functions/Item';
import Items      from './containers/Items';
import Pickup     from './functions/Pickup';
import Pickups    from './containers/Pickups';
import Rental     from './functions/Rental';
import Rentals    from './containers/Rentals';
import Login      from './containers/Login';

const App = function() {
  const [user_id, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [token, setToken]         = useState('');
  const [tokenExp, setTokenExp]   = useState(''); // UNIX TIMESTAMP

  // ATG:: CREATE A LOGIN OBJECT TO PASS ALL HOOK UPDATE FUNCTIONS AS A SINGLE PROP
  const auth = {
    setUserId,
    setFirstName,
    setLastName,
    setEmail,
    setToken,
    setTokenExp,
  };

  console.log('user_id: ', user_id);
  console.log('firstName: ', firstName);
  console.log('lastName: ', lastName);
  console.log('email: ', email);
  console.log('token: ', token);
  console.log('tokenExp: ', tokenExp);
  return (
    <div>
      <Header welcomeBar={firstName}/>
      <Router>
        <Switch>
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
          
          {/* ATG:: EDIT PAGES */}
          <Route exact path='/Customers/:id/edit' render={(routeProps) => <Customer formType={'Edit'} {...routeProps}/>}></Route>
          <Route exact path='/Items/:id/edit' render={(routeProps) => <Item formType={'Edit'} {...routeProps}/>}></Route>
          <Route exact path='/Rentals/:id/edit' render={(routeProps) => <Rental formType={'Edit'} {...routeProps}/>}></Route>
          <Route exact path='/Pickups/:id/edit' render={(routeProps) => <Pickup formType={'Edit'} {...routeProps}/>}></Route>

          {/* ATG:: INDEX PAGES */}
          <Route exact path='/Customers' render={() => <Customers customers={appState.customers}/>}></Route>
          <Route exact path='/Items' render={() => <Items items={appState.items}/>}></Route>
          <Route exact path='/Pickups' render={() => <Pickups pickups={appState.pickups}/>}></Route>
          <Route exact path='/Rentals' render={() => <Rentals rentals={appState.rentals}/>}></Route>
          {/* <Route exact path='/Customers' component={Customers}></Route>
          <Route exact path='/Items' component={Items}></Route>
          <Route exact path='/Pickups' component={Pickups}></Route>
          <Route exact path='/Rentals' component={Rentals}></Route> */}

          <Route exact path='/login' render={() => <Login auth={auth}/>}></Route>
          {/* <Route exact path='/user/signup' component={Signup}></Route> */}

          {/* ATG:: HOME PAGE */}
          <Route path='/' component={Home} appState={appState}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
