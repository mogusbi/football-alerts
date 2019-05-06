import {LayoutActionTypes} from '../actions/LayoutActions';

export const initialState = {
  accountMenu: null,
  drawer: false
};

export function layoutReducer (state = initialState, action) {
  switch (action.type) {
  case LayoutActionTypes.CLOSE_ACCOUNT_MENU:
    return {
      ...state,
      accountMenu: null
    };
  case LayoutActionTypes.CLOSE_DRAWER:
    return {
      ...state,
      drawer: false
    };
  case LayoutActionTypes.OPEN_ACCOUNT_MENU:
    return {
      ...state,
      accountMenu: action.payload
    };
  case LayoutActionTypes.OPEN_DRAWER:
    return {
      ...state,
      drawer: true
    };
  default:
    return state;
  }
}
