import SignupRemoteAPI from 'app/signup/SignupRemoteAPI';


const api = new SignupRemoteAPI();


export function onEnterActivationSection(nextState, replace, callback) {
  function redirectToFallback() {
    return replace({
      pathname: `/login`,
      state: {nextPathname: nextState.location.pathname}
    });
  }

  // This flow is async, and is executed upon full refresh.
  return api.get(nextState.params.uid)
    .catch(redirectToFallback)
    .then(() => callback());
}
