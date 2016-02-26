import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {Footer} from 'app/footer/Footer';


describe('Footer', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<Footer />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('footer');
    chai.expect(element.props.children).to.equal('FOOTER');
  });
});
