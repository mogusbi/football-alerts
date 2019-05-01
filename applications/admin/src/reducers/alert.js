import {AlertActionTypes} from '../actions/AlertActions';

export const initialState = {
  message: [],
  open: false,
  title: ''
};

export function alertReducer (state = initialState, action) {
  switch (action.type) {
  case AlertActionTypes.CLEAR:
    return {
      message: [],
      open: false,
      title: ''
    };
  case AlertActionTypes.SET:
    return {
      message: action.payload.message,
      open: true,
      title: action.payload.title
    };
  default:
    return state;
  }
}
