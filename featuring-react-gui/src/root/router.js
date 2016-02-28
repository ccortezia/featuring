import React from 'react';
import {Router, Route, browserHistory, hashHistory, IndexRoute, Redirect} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import store from 'app/root/store';
import {App} from 'app/root';
import {HomeSection} from 'app/home';
import {FeatureSection, FeatureDetails, FeatureCreate, FeatureEdit} from 'app/feature';
import {onEnterFeatureList, onEnterFeatureItem, onEnterFeatureCreation} from 'app/feature';


// Enhanced history object, better integrated with redux store.
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeSection} onEnter={redirectToDefault} />
      <Route path="/" component={HomeSection} >
        <Route path="features" component={FeatureSection} >
          <IndexRoute component={null} onEnter={onEnterFeatureList} />
          <Route path="new" component={FeatureCreate} onEnter={onEnterFeatureCreation} />
          <Route path=":id" component={FeatureDetails} onEnter={onEnterFeatureItem} />
          <Route path=":id/edit" component={FeatureEdit} onEnter={onEnterFeatureItem} />
        </Route>
      </Route>
      <Redirect from="*" to="/features" />
    </Route>
  </Router>
);

export default router;


function redirectToDefault(nextState, replace) {
  return replace({
    pathname: `/features`,
    state: {nextPathname: nextState.location.pathname}
  });
}
