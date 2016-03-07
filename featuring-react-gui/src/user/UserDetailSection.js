import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import UserRemoteAPI from './UserRemoteAPI';


export default class UserDetailSection extends React.Component {

  constructor({props}) {
    super({props});
    this.state = {data: null};
    this.remoteAPI = new UserRemoteAPI();
  }

  componentWillMount() {
    return this.remoteAPI.get(this.props.params.username)
      .then((data) => this.setState({data}))
      .catch((err) => console.error(err)
        || browserHistory.push(`/`));
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
