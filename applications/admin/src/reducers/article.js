import {ArticleActionTypes} from '../actions/ArticleActions';

export const initialState = {
  articles: [],
  nextToken: null
};

export function articleReducer (state = initialState, action) {
  switch (action.type) {
  case ArticleActionTypes.GET:
    return {
      articles: action.payload.articles,
      nextToken: action.payload.nextToken
    };
  case ArticleActionTypes.NEXT:
    return {
      articles: [
        ...state.articles,
        ...action.payload.articles
      ],
      nextToken: action.payload.nextToken
    };
  default:
    return state;
  }
}
