import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {HomeSection} from 'app/home/HomeSection';


describe('HomeSection', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<HomeSection />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
    chai.expect(element.props.children.length).to.equal(4);
  });
});
