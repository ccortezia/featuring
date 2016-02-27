import _ from 'lodash';
import React from 'react';
import store from 'app/root/store';
import {FeatureBoard} from 'app/feature';
import {selectFeatureListItemAction, receiveFeatureListAction} from 'app/feature/actions';
import {browserHistory} from 'react-router';


const features = [
  {id: 1, title: 'Title 1', description: 'Description 1', priority: 1},
  {id: 2, title: 'Title 2', description: 'Description 2', priority: 2},
  {id: 3, title: 'Title 3', description: 'Description 3', priority: 3},
  {id: 4, title: 'Title 4', description: 'Description 4', priority: 4},
  {id: 5, title: 'Title 5', description: 'Description 5', priority: 5},
  {id: 6, title: 'Title 6', description: 'Description 6', priority: 6},
  {id: 7, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 8, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 9, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 10, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 11, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 12, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 13, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 14, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 15, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 16, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 17, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 18, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 19, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 20, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 21, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 22, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 23, title: 'Title 7', description: 'Description 7', priority: 7},
];


export class FeatureSection extends React.Component {

  // NOTE: this.props.children is injected by the router

  // TODO: move this logic into a route redirect function.
  maybeRedirectDefault() {
    const id = _.first(features).id;
    !this.props.children
      && id !== undefined
      && browserHistory.push(`/features/${id}`);
  }

  componentWillMount() {
    // Trigger retrieval of items data.
    store.dispatch(receiveFeatureListAction(features));

    // Try to redirect to first item in case none is injected from the router
    this.maybeRedirectDefault();
  }

  render() {
    return (
      <section>
        <FeatureBoard items={features} current={this.props.children} />
      </section>
    );
  }
}

export default FeatureSection;
