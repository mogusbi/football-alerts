import {ClubActionTypes} from '../actions/ClubActions';

export const initialState = {
  clubs: [],
  nextToken: null
};

export function clubReducer (state = initialState, action) {
  switch (action.type) {
  case ClubActionTypes.GET:
    return {
      clubs: action.payload.clubs,
      nextToken: action.payload.nextToken
    };
  case ClubActionTypes.NEXT:
    return {
      clubs: [
        ...state.clubs,
        ...action.payload.clubs
      ],
      nextToken: action.payload.nextToken
    };
  default:
    return state;
  }
}
