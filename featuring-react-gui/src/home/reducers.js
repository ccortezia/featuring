
export function homeReducer(state={menuOpened: false}, action) {

  switch(action.type) {
    case 'TOGGLE_NAVBAR':
      return {menuOpened: !state.menuOpened};

    default:
      return state;
  }
}
