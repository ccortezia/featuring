import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import store from 'app/root/store';
import {FeatureBoard} from 'app/feature';
import {selectFeatureListItemAction, remoteRequestFeatureListAction} from 'app/feature/actions';
import {browserHistory} from 'react-router';


export class FeatureSection extends React.Component {


  tryToRedirectToSomeFeature(action) {
    // TODO: move this logic into a route redirect function.
    const features = action.items;
    const id = (_.first(features) || {}).id;
    !this.props.children
      && id !== undefined
      && browserHistory.push(`/features/${id}`);
  }

  componentWillMount() {
    // Trigger retrieval of items data.
    store.dispatch(remoteRequestFeatureListAction())

      // Try to redirect to first item in case none is injected from the router.
      .then(this.tryToRedirectToSomeFeature.bind(this));
  }

  render() {
    return (
      <section>
        <FeatureBoard current={this.props.children} />
      </section>
    );
  }
}

export default FeatureSection;
