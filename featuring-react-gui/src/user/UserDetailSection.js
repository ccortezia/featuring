import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


export function UserDetailSection({username, fullname}) {
  return (
    <section className="user">
      <h1>{fullname}</h1>
      <div>
        <label>USERNAME</label>
        <div>{username}</div>
      </div>
      <div className="btn-bar">
        <Link className="btn btn-default" to="/">BACK</Link>
        <Link className="btn btn-default" to={`/users/${username}/edit`}>EDIT</Link>
      </div>
    </section>
  );
}

export default connect(
  (state) => ({
    username: state.session.username,
    fullname: state.session.fullname
  })
)(UserDetailSection);
