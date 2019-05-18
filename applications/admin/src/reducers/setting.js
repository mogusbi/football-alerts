import {SettingActionTypes} from '../actions/SettingActions';

export const initialState = {
  nextToken: null,
  settings: []
};

export function settingReducer (state = initialState, action) {
  switch (action.type) {
  case SettingActionTypes.GET:
    return {
      nextToken: action.payload.nextToken,
      settings: action.payload.settings
    };
  case SettingActionTypes.NEXT:
    return {
      nextToken: action.payload.nextToken,
      settings: [
        ...state.settings,
        ...action.payload.settings
      ]
    };
  default:
    return state;
  }
}
