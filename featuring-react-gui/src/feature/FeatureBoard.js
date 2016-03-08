import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {FeatureList, FeatureDetails, FeatureCreateInvitation} from 'app/feature';


export function FeatureBoard({items, error, current, selectedItemId}) {
  const paramId = _.get(current, 'props.params.id');
  const numberId = Number(paramId);
  const id = (Number.isInteger(numberId) && numberId) || undefined;
  const data = (id !== undefined && _.find(items, {id})) || _.first(items);
  const CentralComponent = (current && current.type) || FeatureDetails;
  const creating = current && current.props.location.pathname == '/features/new';
  const editing = current && !!current.props.location.pathname.match(/edit/);
  const origins = {central: current.props.location.pathname};
  const errors = {central: error[origins.central]};

  // Determines if the components have navigation focus, which is relevant only
  //  if the application is being presented on a narrow screen. Otherwise, both
  //  components are presented equally.
  const navFocus = {central: !!selectedItemId, list: !selectedItemId && !editing && !creating};

  function makeCentralComponent() {
    if (data || creating) {
      return (
        <CentralComponent
          nav={navFocus.central}
          data={data}
          origin={origins.central}
          error={errors.central} />
      );
    }
    return <FeatureCreateInvitation />
  }

  return (
    <div className="board-feature">
      <FeatureList
        nav={navFocus.list}
        items={items || []}
        selectedId={data && data.id}
        creating={creating}
        editing={editing} />

      {/* TODO: add conditional rendering of details and default page here */}
      {makeCentralComponent()}
    </div>
  );
}

export default connect((state) => ({
  items: state.feature.board.items,
  error: state.error,
  selectedItemId: state.feature.board.selectedItemId
}))(FeatureBoard);
