import {API, graphqlOperation} from 'aws-amplify';
import {history} from '../store';
import {setAlert} from './AlertActions';
import {setMessage} from './MessageActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export function createClub (input) {
  return async (dispatch) => {
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

export function deleteClub (input) {}
