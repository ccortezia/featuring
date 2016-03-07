import * as CT from 'app/header/constants';

export function homeReducer(state={menuOpened: false}, action) {

  switch(action.type) {
    case CT.TOGGLE_NAVBAR:
      return {menuOpened: !state.menuOpened};

    case '@@router/LOCATION_CHANGE':
      return {menuOpened: false};

    default:
      return state;
  }
}
