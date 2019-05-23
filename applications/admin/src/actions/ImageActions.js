import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../graphql/queries';
import {setAlert} from './AlertActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export const ImageActionTypes = {
  GET: '[Image] Get',
  NEXT: '[Image] Next'
};

export function getImages (limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getImages: {images, nextToken}}} = await API.graphql(graphqlOperation(queries.getImages, {
        limit
      }));

      dispatch(getImagesReceived({
        images,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get images'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getImagesReceived (payload) {
  return {
    payload,
    type: ImageActionTypes.GET
  };
}

export function nextImages (limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getImages: {images, nextToken}}} = await API.graphql(graphqlOperation(queries.getImages, {
        limit,
        nextToken: next
      }));

      dispatch(nextImagesReceived({
        images,
        nextToken
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get images'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function nextImagesReceived (payload) {
  return {
    payload,
    type: ImageActionTypes.NEXT
  };
}
