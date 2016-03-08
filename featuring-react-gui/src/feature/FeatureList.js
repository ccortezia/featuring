import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import store from 'app/root/store';
import {FeatureListItem} from 'app/feature';
import {CLIENT_ID_MAP} from 'app/feature/constants';

import {
  selectFeatureFilterClientAction,
  selectFeatureListItemDetailAction
} from 'app/feature/actions';


export class FeatureList extends React.Component {
  constructor({props}) {
    super({props})
    this.mkListItem = this.mkListItem.bind(this);
    this.onClientSelectChange = this.onClientSelectChange.bind(this);
  }

  mkListItem(item) {
    return <FeatureListItem
      key={item.id}
      data={item}
      top={item.priority == 1}
      active={!this.props.creating && item.id == this.props.selectedId}
      disabled={!!this.props.creating || !!this.props.editing}
      onSelectNavigateToDetails={this.props.onSelectNavigateToDetails}
    />;
  }

  onClientSelectChange(ev) {
    store.dispatch(selectFeatureFilterClientAction(ev.target.value));
  }

  componentDidUpdate(prevProps, prevState) {
    // Make sure that an element from the chosen client filter is selected when the filter changes.
    if (prevProps.selectedClientId != this.props.selectedClientId) {
      const items = this.props.items.filter((item) => item.clientId == this.props.selectedClientId);
      const current = items.find((item) => item.id === this.props.selectedId);
      const candidate = _.first(items);
      (!current && !!candidate) && browserHistory.push(`/features/${candidate.id}`);
    }
  }

  render() {
    const filteredItems = this.props.items.filter(
      (item) => item.clientId == this.props.selectedClientId);

    const newButton = !this.props.creating && !this.props.editing &&
        <Link to="/features/new" className="btn btn-primary">NEW</Link>;

    const clientSelector = (!this.props.creating && !this.props.editing && this.props.clientIds.length) ?
      <select
        disabled={this.props.creating || this.props.editing}
        value={this.props.selectedClientId}
        onChange={this.onClientSelectChange}>
        {this.props.clientIds.map((k) =><option key={k} value={k}>{CLIENT_ID_MAP[k]}</option>)}
      </select> : undefined;

    const classes = classNames([
      "panel", "panel-default", "panel-feature-list",
      {'nav-hide': !this.props.nav, 'nav-show': !!this.props.nav}
    ]);

    return (
      <div className={classes}>
        <div className="panel-body">
          {newButton}
          {clientSelector}
        </div>
        <div className="list-group list-feature">
          {(filteredItems || []).map(this.mkListItem)}
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => {
    const selectedClientId = state.feature.board.selectedClientId;
    const items = (state.feature.board.items || []);
    const clientCounts = getClientCountMap(items);
    const clientIds = Object.keys(clientCounts);
    const defaultClientId = Math.min.apply(null, Object.keys(clientCounts));
    const fixedClientId = clientCounts[selectedClientId] ? selectedClientId : defaultClientId;
    return {items, selectedClientId: fixedClientId, clientIds};
  },
  (dispatch) => ({
    onSelectNavigateToDetails: (item) => dispatch(selectFeatureListItemDetailAction(item))
  })
)(FeatureList);


function getClientCountMap(items) {
  return _(items)
    .groupBy('clientId')
    .toPairs()
    .map(([id, items]) => ({[id]: items.length}))
    .value()
    .reduce((curr, val) => Object.assign({}, curr, val), {});
}
