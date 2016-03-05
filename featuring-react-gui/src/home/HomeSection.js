import React from 'react';
import {connect} from 'react-redux';
import {Header} from 'app/header';
import {Footer} from 'app/footer';
import store from 'app/root/store';
import {requestSessionDetailAsyncAction} from 'app/session/actions';


export class HomeSection extends React.Component {
  constructor({children}) {
      super({children});
  }

  componentWillMount() {
    store.dispatch(requestSessionDetailAsyncAction());
  }

  render() {
    return (
      <div className="base home">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect()(HomeSection);
