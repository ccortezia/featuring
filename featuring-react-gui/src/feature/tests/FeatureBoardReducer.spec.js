import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import featureBoardReducer from 'app/feature/FeatureBoardReducer';
import {receiveFeatureListAction, selectFeatureListItemDetailAction} from 'app/feature/actions';


describe('FeatureBoardReducer', () => {

  it('should reset items on RECEIVE_FEATURE_LIST', () => {
    const items = [{id: 1}, {id: 2}];
    const nstate = featureBoardReducer({}, receiveFeatureListAction(items));
    chai.expect(nstate.items.length).to.equal(2);
    chai.expect(nstate.items[0].id).to.equal(items[0].id);
    chai.expect(nstate.items[1].id).to.equal(items[1].id);
  });
});
