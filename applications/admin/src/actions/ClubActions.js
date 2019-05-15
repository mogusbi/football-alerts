import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import history from '../history';
import {setAlert} from './AlertActions';
import {setMessage} from './MessageActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export const ClubActionTypes = {
  GET: '[Club] Get',
  NEXT: '[Club] Next'
};

export function createClub (input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {createClub: {name}}} = await API.graphql(graphqlOperation(mutations.createClub, {
        input
      }));

      dispatch(setMessage({
        message: `${name} has been added!`
      }));

      history.push('/');
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to create club'
      }));
    }

    dispatch(loadingComplete());
  };
}

export function deleteClub (id) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {deleteClub: {name}}} = await API.graphql(graphqlOperation(mutations.deleteClub, {
        id
      }));

      dispatch(setMessage({
        message: `${name} has been deleted!`
      }));

      history.push('/');
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to delete club'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getClubs (limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getClubs: {clubs, nextToken}}} = await API.graphql(graphqlOperation(queries.getClubs, {
        limit
      }));

      dispatch(getClubsReceived({
        clubs,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get clubs'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getClubsReceived (payload) {
  return {
    payload,
    type: ClubActionTypes.GET
  };
}

export function nextClubs (limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getClubs: {clubs, nextToken}}} = await API.graphql(graphqlOperation(queries.getClubs, {
        limit,
        nextToken: next
      }));

      dispatch(nextClubsReceived({
        clubs,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get clubs'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function nextClubsReceived (payload) {
  return {
    payload,
    type: ClubActionTypes.NEXT
  };
}

export function updateClub (id, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {updateClub: {name}}} = await API.graphql(graphqlOperation(mutations.updateClub, {
        id,
        input
      }));

      dispatch(setMessage({
        message: `${name} has been updated!`
      }));

      history.push('/');
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to update club'
      }));
    }

    dispatch(loadingComplete());
  };
}
