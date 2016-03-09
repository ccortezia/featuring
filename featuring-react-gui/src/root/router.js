import React from 'react';
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from 'app/root/store';
import {App} from 'app/root';
import {HomeSection} from 'app/home';
import {UserDetailSection} from 'app/user';
import {UserEditSection} from 'app/user';
import {ActivationSection, onEnterActivationSection} from 'app/activation';
import {LoginSection} from 'app/login';
import {ErrorSection} from 'app/error';
import {FeatureSection, FeatureDetails, FeatureCreate, FeatureEdit} from 'app/feature';
import {onEnterFeatureList, onEnterFeatureItem, onEnterFeatureCreation} from 'app/feature';


// Enhanced history object, better integrated with redux store.
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeSection} onEnter={redirectToDefault} />
      <Route path="activation/:uid" component={ActivationSection} onEnter={onEnterActivationSection}/>
      <Route path="login" component={LoginSection} />
      <Route path="/" component={HomeSection} >
        <Route path="users/:username/edit" component={UserEditSection} />
        <Route path="users/:username" component={UserDetailSection} />
        <Route path="features" component={FeatureSection} >
          <IndexRoute component={null} onEnter={onEnterFeatureList} />
          <Route path="new" component={FeatureCreate} onEnter={onEnterFeatureCreation} />
          <Route path=":id" component={FeatureDetails} onEnter={onEnterFeatureItem} />
          <Route path=":id/edit" component={FeatureEdit} onEnter={onEnterFeatureItem} />
        </Route>
        <Route path="/error" component={ErrorSection} />
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
