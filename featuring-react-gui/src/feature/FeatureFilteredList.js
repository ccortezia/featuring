import React from 'react';
import {connect} from 'react-redux';
import {FeatureList} from 'app/feature';


export default connect(
  (state) => {
    const selectedClientId = state.feature.board.selectedClientId;
    const items = (state.feature.board.items || []);
    return {
      items: items.filter((item) => item.clientId == selectedClientId),
      selectedClientId
    }
  }
)(FeatureList);
