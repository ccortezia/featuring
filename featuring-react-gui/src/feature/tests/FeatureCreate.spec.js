import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {FeatureCreate} from 'app/feature/FeatureCreate';


describe('FeatureCreate', () => {

  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<FeatureCreate />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
  });
});
