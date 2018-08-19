import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './home';
import Login from './login';
import {isLoggedIn} from './remote';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute component={Home}/>
        </Switch>
      </div>
    </Router>
  );
}


function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route {...rest} render={props =>
          isLoggedIn() ?
          (<Component {...props} />) :
          (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>)
    }/>
  );
}

export default App
