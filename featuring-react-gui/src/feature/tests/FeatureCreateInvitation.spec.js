import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {FeatureCreateInvitation} from 'app/feature/FeatureCreateInvitation';


describe('FeatureCreateInvitation', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<FeatureCreateInvitation />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
  });
});
