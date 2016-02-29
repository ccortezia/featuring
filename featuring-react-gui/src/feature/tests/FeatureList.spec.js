import chai from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {FeatureList} from 'app/feature/FeatureList';


describe('FeatureList', () => {
  const items = [{id: 1, title: 'Title 1', description: 'Description 1', priority: 1}];

  it('should render properly and not crash', () => {
    let renderer = TestUtils.createRenderer();
    renderer.render(<FeatureList items={items} clientIds={[]}/>);
    let element = renderer.getRenderOutput();
    chai.expect(TestUtils.isElement(element)).to.be.true;
    chai.expect(element.type).to.equal('div');
  });
});
