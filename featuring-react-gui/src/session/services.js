import {TOKEN_ID} from './constants';


export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_ID);
}


export function authHeader() {
  let token = localStorage.getItem(TOKEN_ID) || '';
  return `Bearer ${token}`;
}


export function persistSessionToken(token) {
  localStorage.setItem(TOKEN_ID, token);
}


export function destroySessionToken() {
  localStorage.removeItem(TOKEN_ID);
}
