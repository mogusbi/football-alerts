import {SourceActionTypes} from '../actions/SourceActions';

export const initialState = {
  nextToken: null,
  sources: []
};

export function sourceReducer (state = initialState, action) {
  switch (action.type) {
  case SourceActionTypes.GET:
    return {
      nextToken: action.payload.nextToken,
      sources: action.payload.sources
    };
  case SourceActionTypes.NEXT:
    return {
      nextToken: action.payload.nextToken,
      sources: [
        ...state.sources,
        ...action.payload.sources
      ]
    };
  default:
    return state;
  }
}
