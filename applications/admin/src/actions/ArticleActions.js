import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../graphql/queries';
import {setAlert} from './AlertActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export const ArticleActionTypes = {
  GET: '[Article] Get',
  NEXT: '[Article] Next'
};

export function getArticles (clubId, limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getArticles: {articles, nextToken}}} = await API.graphql(graphqlOperation(queries.getArticles, {
        clubId,
        limit
      }));

      dispatch(getArticlesReceived({
        articles,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get articles'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getArticlesReceived (payload) {
  return {
    payload,
    type: ArticleActionTypes.GET
  };
}

export function nextArticles (clubId, limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getArticles: {articles, nextToken}}} = await API.graphql(graphqlOperation(queries.getArticles, {
        clubId,
        limit,
        nextToken: next
      }));

      dispatch(nextArticlesReceived({
        articles,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get articles'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function nextArticlesReceived (payload) {
  return {
    payload,
    type: ArticleActionTypes.NEXT
  };
}
