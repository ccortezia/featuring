import React from 'react';
import {LogoutButton} from 'app/login'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {navbarToggleAction} from './actions';


export function Header({username, onNavToggle}) {
  return (
    <header>
      <Link to="/" className="logo">FEATURING</Link>
      <div className="auth-box">
        <Link className="username" to={`/users/${username}`}>{username}</Link>
        <LogoutButton redirectTo="/login" />
      </div>
      <button className="btn btn-dark nav-toggle" onClick={onNavToggle}>
        <i className="fa fa-lg fa-navicon" />
      </button>
    </header>
  );
}

export default connect(
  (state) => ({
    username: state.session.username
  }),
  (dispatch) => ({
    onNavToggle: () => dispatch(navbarToggleAction())
  })
)(Header);
