import React from 'react';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import store from 'app/root/store';
import {App} from 'app/root';
import {HomeSection} from 'app/home';


// Enhanced history object, better integrated with redux store.
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeSection} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

export default router;


function NoMatch() {
  return <p>No Match</p>;
}
