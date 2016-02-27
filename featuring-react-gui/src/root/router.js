import React from 'react';
import {Router, Route, browserHistory, hashHistory, IndexRoute, Redirect} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import store from 'app/root/store';
import {App} from 'app/root';
import {HomeSection} from 'app/home';
import {FeatureSection, FeatureDetails} from 'app/feature';


// Enhanced history object, better integrated with redux store.
const history = syncHistoryWithStore(browserHistory, store);

// TODO: add route validation and redirection using onEnter on /features
// TODO: add route validation and redirection using onEnter on /features/:id
const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeSection} />
      <Route path="/" component={HomeSection}>
        <Route path="features" component={FeatureSection} >
          <Route path=":id" component={FeatureDetails} />
        </Route>
      </Route>
      <Redirect from="*" to="/features" />
    </Route>
  </Router>
);

export default router;


function NoMatch() {
  return <p>No Match</p>;
}
