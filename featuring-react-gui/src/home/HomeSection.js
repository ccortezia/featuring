import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {Header} from 'app/header';
import {Footer} from 'app/footer';
import {LogoutButton} from 'app/login';
import {Link} from 'react-router';
import store from 'app/root/store';
import {requestSessionDetailAsyncAction} from 'app/session/actions';


export class HomeSection extends React.Component {
  constructor({props}) {
      super({props});
  }

  componentWillReceiveProps(nextProps) {
    // Fetch user data again in case it got lost.
    if (!this.props.username && !nextProps.username) {
      store.dispatch(requestSessionDetailAsyncAction());
    }
  }

  componentWillMount() {
    store.dispatch(requestSessionDetailAsyncAction());
  }

  render() {
    return (
      <div className="base home">
        <Header />

        <nav className={classNames({opened: this.props.menuOpened})}>
          <Link className="item" to={`/users/${this.props.username}`}>
            <div className="username"><i className="fa fa-user"/>{this.props.username}</div>
          </Link>
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
