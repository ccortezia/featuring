import chai from 'chai';
import {App} from 'app/root/components';


describe('App', () => {
  it('should render properly and not crash', () => {
    chai.expect(App()).to.equal('123');
  });
});
