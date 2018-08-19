import React from 'react';
import './Header.css';
import {LogoutButton} from '../login';
import {Link} from 'react-router-dom';


export default function Header({onLogout, profile}) {
  return (
    <header className="primary">
      <Link to="/" className="logo">FEATURING</Link>
      <div className="auth-box">
        <div className="username">{profile && profile.fullname}</div>
        <LogoutButton onLogout={onLogout} />
      </div>
    </header>
  );
}
