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

      dispatch({
        payload: {
          clubs,
          nextToken
        },
        type: ClubActionTypes.GET
      })
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get clubs'
      }));
    }

    dispatch(loadingComplete());
  }
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

      dispatch({
        payload: {
          clubs,
          nextToken
        },
        type: ClubActionTypes.NEXT
      })
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get clubs'
      }));
    }

    dispatch(loadingComplete());
  }
}
