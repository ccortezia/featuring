import React from 'react';
import {LogoutButton} from 'app/login'
import {connect} from 'react-redux';
import {navbarToggleAction} from './actions';


export function Header({username, onNavToggle}) {
  return (
    <header>
      <div className="logo">FEATURING</div>
      <div className="auth-box">
        <div className="username">{username}</div>
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
