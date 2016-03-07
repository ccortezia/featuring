import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {Header} from 'app/header';
import {Footer} from 'app/footer';
import {LogoutButton} from 'app/login';
import store from 'app/root/store';
import {requestSessionDetailAsyncAction} from 'app/session/actions';


export class HomeSection extends React.Component {
  constructor({props}) {
      super({props});
  }

  componentWillMount() {
    store.dispatch(requestSessionDetailAsyncAction());
  }

  render() {
    return (
      <div className="base home">
        <Header />

        <nav className={classNames({opened: this.props.menuOpened})}>
          <div className="item"><span>{this.props.username}</span></div>
          <div className="item"><LogoutButton redirectTo="/login" /></div>
        </nav>

        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    username: state.session.username,
    menuOpened: state.home.menuOpened
  })
)(HomeSection);
