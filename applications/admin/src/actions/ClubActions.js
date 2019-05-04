import {API, graphqlOperation} from 'aws-amplify';
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
    const mutation = `mutation CreateClub($input: ClubInput!) {
      createClub(input: $input) {
        name
      }
    }`;

    dispatch(loadingStart());

    try {
      const {data: {createClub: {name}}} = await API.graphql(graphqlOperation(mutation, {
        input
      }));

      dispatch(setMessage({
        message: `${name} has been added!`
      }));

      history.push('/clubs');
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
    const mutation =`mutation DeleteClub($id: ID!) {
      deleteClub(id: $id) {
        name
      }
    }`;

    dispatch(loadingStart());

    try {
      const {data: {deleteClub: {name}}} = await API.graphql(graphqlOperation(mutation, {
        id
      }));

      dispatch(setMessage({
        message: `${name} has been deleted!`
      }));

      history.push('/clubs');
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
    const query = `query GetClubs($limit: Int, $nextToken: String) {
      getClubs(limit: $limit, nextToken: $nextToken) {
        clubs {
          id
          name
        }
        nextToken
      }
    }`;

    dispatch(loadingStart());

    try {
      const {data: {getClubs: {clubs, nextToken}}} = await API.graphql(graphqlOperation(query, {
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
    const query = `query GetClubs($limit: Int, $nextToken: String) {
      getClubs(limit: $limit, nextToken: $nextToken) {
        clubs {
          id
          name
        }
        nextToken
      }
    }`;

    dispatch(loadingStart());

    try {
      const {data: {getClubs: {clubs, nextToken}}} = await API.graphql(graphqlOperation(query, {
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
    const mutation = `mutation UpdateClub($id: ID!, $input: ClubInput!) {
      updateClub(id: $id, input: $input) {
        name
      }
    }`;

    dispatch(loadingStart());

    try {
      const {data: {updateClub: {name}}} = await API.graphql(graphqlOperation(mutation, {
        id,
        input
      }));

      dispatch(setMessage({
        message: `${name} has been updated!`
      }));

      history.push('/clubs');
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to update club'
      }));
    }

    dispatch(loadingComplete());
  };
}
