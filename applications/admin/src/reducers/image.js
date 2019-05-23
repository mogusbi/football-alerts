import {ImageActionTypes} from '../actions/ImageActions';

export const initialState = {
  images: [],
  nextToken: null
};

export function imageReducer (state = initialState, action) {
  switch (action.type) {
  case ImageActionTypes.GET:
    return {
      images: action.payload.images,
      nextToken: action.payload.nextToken
    };
  case ImageActionTypes.NEXT:
    return {
      images: [
        ...state.images,
        ...action.payload.images
      ],
      nextToken: action.payload.nextToken
    };
  default:
    return state;
  }
}
