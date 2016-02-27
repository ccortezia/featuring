import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {HomeSection} from 'app/home/HomeSection';
import {Header} from 'app/header/Header';
import {Footer} from 'app/footer/Footer';
import {FeatureSection} from 'app/feature/FeatureSection';


describe('HomeSection', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<HomeSection />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
    chai.expect(element.props.children.length).to.equal(3);
    chai.expect(element.props.children[0].type).to.equal(Header);
    chai.expect(element.props.children[2].type).to.equal(Footer);
    // This is undefined because there is no router injection going on.
    chai.expect(element.props.children[1]).to.equal(undefined);
  });
});
