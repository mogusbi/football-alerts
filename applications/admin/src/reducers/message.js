import {MessageActionTypes} from '../actions/MessageActions';

export const initialState = {
  message: '',
  open: false
};

export function messageReducer (state = initialState, action) {
  switch (action.type) {
    case MessageActionTypes.CLEAR:
      return {
        message: '',
        open: false
      };
    case MessageActionTypes.SET:
      return {
        message: action.payload.message,
        open: true
      };
    default:
      return state;
  }
}
