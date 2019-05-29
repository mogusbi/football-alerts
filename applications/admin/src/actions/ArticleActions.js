import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import history from '../history';
import {setAlert} from './AlertActions';
import {loadingComplete, loadingStart} from './LoaderActions';
import {setMessage} from './MessageActions';

export const ArticleActionTypes = {
  GET: '[Article] Get',
  NEXT: '[Article] Next'
};

export function deleteArticle (id, clubId) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {deleteArticle: {title}}} = await API.graphql(graphqlOperation(mutations.deleteArticle, {
        clubId,
        id
      }));

      dispatch(setMessage({
        message: `${title} has been deleted!`
      }));

      history.push(`/clubs/${clubId}/articles`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to delete article'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getArticles (clubId, status, limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getArticles: {articles, nextToken}}} = await API.graphql(graphqlOperation(queries.getArticles, {
        clubId,
        limit,
        status: status.toUpperCase()
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

export function nextArticles (clubId, status, limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getArticles: {articles, nextToken}}} = await API.graphql(graphqlOperation(queries.getArticles, {
        clubId,
        limit,
        nextToken: next,
        status: status.toUpperCase()
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

export function updateArticle (id, clubId, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {updateArticle: {title}}} = await API.graphql(graphqlOperation(mutations.updateArticle, {
        clubId,
        id,
        input
      }));

      dispatch(setMessage({
        message: `${title} has been updated!`
      }));

      history.push(`/clubs/${clubId}/articles`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to update article'
      }));
    }

    dispatch(loadingComplete());
  };
}
