import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {HomeSection, Header, Footer} from 'app/home/HomeSection';


describe('Header', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<Header />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('header');
    chai.expect(element.props.children).to.equal('HEADER');
  });
});


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

describe('HomeSection', () => {
  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<HomeSection />);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
    chai.expect(element.props.children.length).to.equal(3);
    chai.expect(element.props.children[0].type).to.equal(Header);
    chai.expect(element.props.children[1].type).to.equal('div');
    chai.expect(element.props.children[2].type).to.equal(Footer);
  });
});
