import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import history from '../history';
import {setAlert} from './AlertActions';
import {setMessage} from './MessageActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export const SourceActionTypes = {
  GET: '[Source] Get',
  NEXT: '[Source] Next'
};

export function createSource (clubId, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {createSource: {name}}} = await API.graphql(graphqlOperation(mutations.createSource, {
        clubId,
        input
      }));

      dispatch(setMessage({
        message: `${name} has been added!`
      }));

      history.push(`/clubs/${clubId}/sources`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to create source'
      }));
    }

    dispatch(loadingComplete());
  };
}

export function deleteSource (id, clubId) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {deleteSource: {name}}} = await API.graphql(graphqlOperation(mutations.deleteSource, {
        clubId,
        id
      }));

      dispatch(setMessage({
        message: `${name} has been deleted!`
      }));

      history.push(`/clubs/${clubId}/sources`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to delete source'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getSources (clubId, limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getSources: {nextToken, sources}}} = await API.graphql(graphqlOperation(queries.getSources, {
        clubId,
        limit
      }));

      dispatch(getSourcesReceived({
        nextToken,
        sources
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get sources'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getSourcesReceived (payload) {
  return {
    payload,
    type: SourceActionTypes.GET
  };
}

export function nextSources (clubId, limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getSources: {nextToken, sources}}} = await API.graphql(graphqlOperation(queries.getSources, {
        clubId,
        limit,
        nextToken: next
      }));

      dispatch(nextSourcesReceived({
        nextToken,
        sources
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get sources'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function nextSourcesReceived (payload) {
  return {
    payload,
    type: SourceActionTypes.NEXT
  };
}

export function updateSource (id, clubId, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {updateSource: {name}}} = await API.graphql(graphqlOperation(mutations.updateSource, {
        clubId,
        id,
        input
      }));

      dispatch(setMessage({
        message: `${name} has been updated!`
      }));

      history.push(`/clubs/${clubId}/sources`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to update source'
      }));
    }

    dispatch(loadingComplete());
  };
}
