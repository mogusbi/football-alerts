import {DrawerActionTypes} from '../actions/DrawerActions';

export const initialState = {
  open: false
};

export function drawerReducer (state = initialState, {type}) {
  switch (type) {
  case DrawerActionTypes.CLOSE:
    return {
      open: false
    };
  case DrawerActionTypes.OPEN:
    return {
      open: true
    };
  default:
    return state;
  }
}
