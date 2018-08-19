import React from 'react';
import {destroySessionToken} from '../remote';


export function LogoutButton({onLogout}) {
    return (
        <button className="btn btn-default" onClick={onClickHandler}>Logout</button>
    );

    function onClickHandler() {
        destroySessionToken();
        onLogout();
    }
}
