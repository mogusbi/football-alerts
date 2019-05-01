import {LoaderActionTypes} from '../actions/LoaderActions';

export const initialState = {
  loading: false
};

export function loaderReducer (state = initialState, {type}) {
  switch (type) {
  case LoaderActionTypes.COMPLETE:
    return {
      loading: false
    };
  case LoaderActionTypes.START:
    return {
      loading: true
    };
  default:
    return state;
  }
}
