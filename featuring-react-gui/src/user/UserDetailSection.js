import React from 'react';
import {Link, browserHistory} from 'react-router';
import store from 'app/root/store';
import {remoteRequestUserItemAction} from 'app/user/actions';


export default class UserDetailSection extends React.Component {

  constructor({props}) {
    super({props});
    this.state = {data: null};
  }

  componentWillMount() {
    const origin = this.props.location.pathname;
    const username = this.props.params.username;
    store.dispatch(remoteRequestUserItemAction({username, origin}))
      .then((action) => action.data)
      .then((data) => this.setState({data}))
      .catch((err) => console.error(err)
        || browserHistory.push(`/error`));
  }

  render() {
    return (
      <section className="user">
        <h1>{this.state.data && this.state.data.fullname}
          <small>{this.state.data && this.state.data.username}</small>
        </h1>
        <div className="btn-bar">
          <Link className="btn btn-default" to="/">BACK</Link>
          <Link className="btn btn-default" to={`/users/${this.props.params.username}/edit`}>EDIT</Link>
        </div>
      </section>
    );
  }
}
