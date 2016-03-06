import React from 'react';
import {LogoutButton} from 'app/login'
import {connect} from 'react-redux';


export function Header({username}) {
  return (
    <header>
      <div className="logo">FEATURING</div>
      <div className="auth-box">
        <div className="username">{username}</div>
        <LogoutButton redirectTo="/login" />
      </div>
    </header>
  );
}

export default connect(
  (state) => ({
    username: state.session.username
  })
)(Header);
