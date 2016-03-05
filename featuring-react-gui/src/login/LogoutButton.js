import React from 'react';
import {connect} from 'react-redux';
import {requestSessionDeleteAsyncAction} from 'app/session/actions';
import {browserHistory} from 'react-router'


export function LogoutButton({dispatch, redirectTo}) {
  return (
    <a href="#" className="btn btn-default btn-logout" onClick={ev => {
      ev.preventDefault();
      dispatch(requestSessionDeleteAsyncAction())
        .then(() => redirectTo && browserHistory.push(redirectTo));
    }}>LOGOUT</a>
  );
}


export default connect()(LogoutButton);
